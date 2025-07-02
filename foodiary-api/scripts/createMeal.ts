/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';

const API_URL = 'https://api.foodiary.com.br/meals';
const TOKEN = 'eyJraWQiOiJaVjdkSGI5Y0hyQlwvbEY5QXB4YUdOTnZDRFNsTGxpVURcL1B6U29ZWk1CcVE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxMzdjZGFhYS1lMGIxLTcwOGItZjU2Ni1lNWVmYzJlNWY4NzkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuc2EtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3NhLWVhc3QtMV80a0FWUzU0eXgiLCJjbGllbnRfaWQiOiIyczBjZWpodmwxdnR0aGp1cTZnbm9ram8zZSIsIm9yaWdpbl9qdGkiOiJkODE5OGNjNC00NjdlLTQ2MDktYTdkOS03YzgyOTNhNTJlZDciLCJpbnRlcm5hbElkIjoiMnltbFdCb2R3Z0JLeWc2Z1RTRDEycllKRHBpIiwiZXZlbnRfaWQiOiJjMjQ3OWJiMS1kZWVjLTQ4NGUtOThjYi1lYmVmNDUxYTUxMWEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzUxMzA5NzU1LCJleHAiOjE3NTEzNTI5NTQsImlhdCI6MTc1MTMwOTc1NSwianRpIjoiNzIyYTFhMmQtOTJmYS00ODc2LWJiOTQtZmY4ZmIzY2E1NzUwIiwidXNlcm5hbWUiOiIxMzdjZGFhYS1lMGIxLTcwOGItZjU2Ni1lNWVmYzJlNWY4NzkifQ.qJ0GHaw1BGp0clWeHoz3l9xcyeXKMg-JZ2WtdFOQywfF12PhXeMqSS21qtzbWjgltfNThRQS2Pw2RNA2O9aLjwnrCgdl6jBOIrAGP4pKrXCwWrBp_37HHXNWz3J05G9G2o5NGhO1CyUA-627655xiFuKuW9T6ReCfC-DaaaME5WUgVOW41cHM6nY1ydXyyZhvhfhyGmFhfXT6llrh_95CoRSof2kKPnF2iQwV60ROSu1SMRVaLuQpDhd01X5ct-V-P1q0wjIwAgArV7AbAAxZVO52UmmNhbvyBuO3dXS0a740aqcfrCxKFy74VAR32wgqINIzAB9MTtPv9hDsHM6Fw';

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
