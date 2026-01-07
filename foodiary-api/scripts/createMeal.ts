/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';

const API_URL = 'https://api.foodiary.com.br/meals';
const TOKEN = 'eyJraWQiOiJaVjdkSGI5Y0hyQlwvbEY5QXB4YUdOTnZDRFNsTGxpVURcL1B6U29ZWk1CcVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiMzNjNGE3YS1mMDcxLTcwMGEtM2Q1ZS1hYjJjZmNkY2I5NDgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuc2EtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3NhLWVhc3QtMV80a0FWUzU0eXgiLCJjbGllbnRfaWQiOiIyczBjZWpodmwxdnR0aGp1cTZnbm9ram8zZSIsIm9yaWdpbl9qdGkiOiJhMDg1ZThiYS04MDM0LTRlODYtOTc4Ni1lZTQ5OWZhOGIwMDIiLCJpbnRlcm5hbElkIjoiMzFJVThBUzVVbWZsVWQ1WDhOOVZOUUlKRmdMIiwiZXZlbnRfaWQiOiI5MTFiMDI2Yy03ZmY1LTQ2NjYtOWFkNC1lNzMxMTJjMjZhZmMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzY2MTc5MzQ4LCJleHAiOjE3NjYyMjI1NDgsImlhdCI6MTc2NjE3OTM0OCwianRpIjoiOTM1ZmNhYTUtZmJhMS00YzYxLTlhZTMtN2UyMWFlOTgzMWU3IiwidXNlcm5hbWUiOiJiMzNjNGE3YS1mMDcxLTcwMGEtM2Q1ZS1hYjJjZmNkY2I5NDgifQ.DnThEkYOW0VSv6QKRFgIFoccdX_cHgkbZKEAIDFKTupac-0JuoNfaR9DailKtkD2spFbVoz_DN2hmev7retg9Wem6uAs0-mAwiqv2-0aMaeBoudZPTUsmgyJd63KkNsQcMcaADM5R7QAjkDgk579Zr0c8TIoSB9jyRqN5SBA_ELrrDDStOXVD3JbOG2MzOBseID7_9WwR6TWCdlLDMG6hzJF3U8xxhH5FNEkHQeDZsrawnV9Ftp_8I2O8hhsqBApy6hIOYMGdZOpsMMqTZM-Px0shl_jzT6yAiNiuHb7h7YFSoeg62gEeOpprJwsY6H4l6Q1DEsX8wIeaLRj6VRBmQ';

interface IPresignResponse {
  uploadSignature: string;
}

interface IPresignDecoded {
  url: string;
  fields: Record<string, string>;
}

async function readFile(filePath: string, type: 'audio/m4a' | 'image/jpeg'): Promise<{
  data: Buffer;
  size: number;
  type: string;
}> {
  console.log(`🔍 Reading file from disk: ${filePath}`);
  const data = await fs.readFile(filePath);
  return {
    data,
    size: data.length,
    type,
  };
}

async function createMeal(
  fileType: string,
  fileSize: number,
): Promise<IPresignDecoded> {
  console.log(`🚀 Requesting presigned POST for ${fileSize} bytes of type ${fileType}`);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ file: { type: fileType, size: fileSize } }),
  });

  if (!res.ok) {
    throw new Error(`Failed to get presigned POST: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as IPresignResponse;
  const decoded = JSON.parse(
    Buffer.from(json.uploadSignature, 'base64').toString('utf-8'),
  ) as IPresignDecoded;

  console.log('✅ Received presigned POST data');
  return decoded;
}

function buildFormData(
  fields: Record<string, string>,
  fileData: Buffer,
  filename: string,
  fileType: string,
): FormData {
  console.log(`📦 Building FormData with ${Object.keys(fields).length} fields and file ${filename}`);
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    form.append(key, value);
  }
  const blob = new Blob([fileData], { type: fileType });
  form.append('file', blob, filename);
  return form;
}

async function uploadToS3(url: string, form: FormData): Promise<void> {
  console.log(`📤 Uploading to S3 at ${url}`);
  const res = await fetch(url, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`S3 upload failed: ${res.status} ${res.statusText} — ${text}`);
  }

  console.log('🎉 Upload completed successfully');
}

async function uploadFile(filePath: string, fileType: 'audio/m4a' | 'image/jpeg'): Promise<void> {
  try {
    const { data, size, type } = await readFile(filePath, fileType);
    const { url, fields } = await createMeal(type, size);
    const form = buildFormData(fields, data, path.basename(filePath), type);
    await uploadToS3(url, form);
  } catch (err) {
    console.error('❌ Error during uploadFile:', err);
    throw err;
  }
}

uploadFile(
  path.resolve(__dirname, 'assets', 'refeicao.jpg'),
  'image/jpeg',
).catch(() => process.exit(1));
