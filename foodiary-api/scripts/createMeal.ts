/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';

const API_URL = 'https://api.foodiary.com.br/meals';
const TOKEN = 'eyJraWQiOiJaVjdkSGI5Y0hyQlwvbEY5QXB4YUdOTnZDRFNsTGxpVURcL1B6U29ZWk1CcVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxMzdjZGFhYS1lMGIxLTcwOGItZjU2Ni1lNWVmYzJlNWY4NzkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuc2EtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3NhLWVhc3QtMV80a0FWUzU0eXgiLCJjbGllbnRfaWQiOiIyczBjZWpodmwxdnR0aGp1cTZnbm9ram8zZSIsIm9yaWdpbl9qdGkiOiIyYjM5OWVhMy0xZDQyLTRmZjQtOTFkMC0wZGQ4ZDA4ODQ1OGMiLCJpbnRlcm5hbElkIjoiMnltbFdCb2R3Z0JLeWc2Z1RTRDEycllKRHBpIiwiZXZlbnRfaWQiOiI4NmQ1YzU2Zi1mNWZlLTRjOWQtYmM3OS0xZTk2ZTc3MDgxNGEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzUwNDQ3NjYwLCJleHAiOjE3NTA0OTA4NjAsImlhdCI6MTc1MDQ0NzY2MCwianRpIjoiN2FjM2RiYjctNTRmOC00YjZkLThjMjUtZWNmOTJkZGIzNWYzIiwidXNlcm5hbWUiOiIxMzdjZGFhYS1lMGIxLTcwOGItZjU2Ni1lNWVmYzJlNWY4NzkifQ.jjq8O7xbp7UrRf-nYCtYRaXa6CniDzK4ssu4iXXjHO4nnSLUjVftpqCpjxXXtH9zOUoArRQkHF8qO0TnLtdl737TWtuQm-cKZk9VcjROt7rgzYMOZ6dTCXzbbt5lRkKJUa2Y7NBJ50L3E9zXhRetFt8Zr6Sd9ZjsqHRI_y-4MZpBYgFKAEFSd_FV3j1AkLLodqYyRXAvZDxXU_Cc9T2QvMw_ZIZKXUVW0LER_9_TQWrY_7wvIbpz-LuqMOR_jJiwezCK2nvV9xFzlHQ5CkZ949IoCwHnrRmDgO97PJFB8ZL8O3MfS7hrQ4Dxedblz74BOew1makqtP--zUt_gbnf7g';

interface IPresignResponse {
  uploadSignature: string;
}

interface IPresignDecoded {
  url: string;
  fields: Record<string, string>;
}

async function readImageFile(filePath: string): Promise<{
  data: Buffer;
  size: number;
  type: string;
}> {
  console.log(`🔍 Reading file from disk: ${filePath}`);
  const data = await fs.readFile(filePath);
  return {
    data,
    size: data.length,
    type: 'image/jpeg',
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

async function uploadMealImage(filePath: string): Promise<void> {
  try {
    const { data, size, type } = await readImageFile(filePath);
    const { url, fields } = await createMeal(type, size);
    const form = buildFormData(fields, data, path.basename(filePath), type);
    await uploadToS3(url, form);
  } catch (err) {
    console.error('❌ Error during uploadMealImage:', err);
    throw err;
  }
}

uploadMealImage(
  path.resolve(__dirname, 'assets', 'cover.jpg'),
).catch(() => process.exit(1));
