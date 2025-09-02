/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';

const API_URL = 'https://api.foodiary.com.br/meals';
const TOKEN = 'eyJraWQiOiJaVjdkSGI5Y0hyQlwvbEY5QXB4YUdOTnZDRFNsTGxpVURcL1B6U29ZWk1CcVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2MzJjMWE1YS1lMDMxLTcwNjctMDI5MC1iM2IxZjQ1MTFiM2UiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuc2EtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3NhLWVhc3QtMV80a0FWUzU0eXgiLCJjbGllbnRfaWQiOiIyczBjZWpodmwxdnR0aGp1cTZnbm9ram8zZSIsIm9yaWdpbl9qdGkiOiIzMjVmYTFjNy1lMDFjLTRiYmQtOWQwZC1kNjAyNmIwOGVhNzgiLCJpbnRlcm5hbElkIjoiMzFJVUNDcEExTW40aVRXWmQycFU3dDdVY1VZIiwiZXZlbnRfaWQiOiI3Mzc3ODg5MC1mNTg3LTQzZTQtODYxZS1hMTdlYjMxZGFlNjgiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzU1MjEwOTUxLCJleHAiOjE3NTUyNTQxNTEsImlhdCI6MTc1NTIxMDk1MSwianRpIjoiOGJhMDJhNGMtY2E5YS00ZmI3LTg1OTMtYmFkOGVjOGVkYzA0IiwidXNlcm5hbWUiOiI2MzJjMWE1YS1lMDMxLTcwNjctMDI5MC1iM2IxZjQ1MTFiM2UifQ.guj8ucxW9qP__w5EsrpvBiMwx0UBYDcvm05BCjWY4xYmQTXN9BbpgBAdIiwP4H2sUQy4L29DYhhiSKQM8xCsyTfe3yiL3sqBWuAcP0yiJkil5AsiJiclAfThvac_QoO1HKtU-NEC5JaO7Bct1hHp3etoKIqzKQW7-bQPgkmmMjSEO_7wj5gZnbB2EQUG1HnEAltO_zMHHgs_05U15v6CEpMZfpRAp_1dZ4D4-Jj_KDRknrdqVTOCAh18sVzHwHnl4PR3Rg3emEU0DKuPhQLZ-uYG4QFoyewfomY4p3CDYK7nNKF4lZsmgBuS2m8IHxrYkOzuoTrw1UhB8L7r0AgQXg';

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
