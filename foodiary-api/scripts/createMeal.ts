/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';

const API_URL = 'https://api.foodiary.com.br/meals';
const TOKEN = 'eyJraWQiOiJaVjdkSGI5Y0hyQlwvbEY5QXB4YUdOTnZDRFNsTGxpVURcL1B6U29ZWk1CcVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiMzNjNGE3YS1mMDcxLTcwMGEtM2Q1ZS1hYjJjZmNkY2I5NDgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuc2EtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3NhLWVhc3QtMV80a0FWUzU0eXgiLCJjbGllbnRfaWQiOiIyczBjZWpodmwxdnR0aGp1cTZnbm9ram8zZSIsIm9yaWdpbl9qdGkiOiI5ZTcwNzdjMC05MTU4LTQwOGEtYmFhYS02ZDIyZjVkYmQ5NGUiLCJpbnRlcm5hbElkIjoiMzFJVThBUzVVbWZsVWQ1WDhOOVZOUUlKRmdMIiwiZXZlbnRfaWQiOiIzYjA1ZmQzNS1mNWU2LTRjMzYtOTc5YS0xZmEyMDJjOTJhZjgiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzY0NjgxMjk3LCJleHAiOjE3NjQ3MjQ0OTcsImlhdCI6MTc2NDY4MTI5NywianRpIjoiYWMxMjQwNjAtNTkzOS00NmJkLTg2YTctYTAzNWFhOGM2NGVkIiwidXNlcm5hbWUiOiJiMzNjNGE3YS1mMDcxLTcwMGEtM2Q1ZS1hYjJjZmNkY2I5NDgifQ.HZusNnEQIMv6y2bedOxRP6VQLviUpCNorZ15Qo4m0y93VaxKyiMgim9lPxs8b2y3ZTqduwxCND0OJmMhyGBhxp-LzTuoQ2I9pvPO6_-NOFJDY_BWrjp5erJOA853tYDho6u1KD-fUlK2MBRPlBNp2JbZb4AVZlPdCY-6BzOYb4-fb0cJSOqUtI-qDZ0B-4c6d8MkT8pESqyjXmprML_FXZC_wsxaBda93heWkPDVvYrv06amvhIW0h65zOdt_zXSUWcQl-EAkkIWGdxkxkC42vc-A7ZzXB6FHVZqxPXTXSgGWynKqalDj967Z893cxmuTL-s5tEyoXG4DlXXAabjlg';

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
