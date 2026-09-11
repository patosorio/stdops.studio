import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import {
  aboutPhotoStoragePath,
  contentImagesDocPath,
  firebaseProjectId,
  firebaseStorageBucket,
  localServiceImageSrc,
  serviceImageIds,
  serviceImageStoragePaths,
  storageDownloadUrl,
  workImageIds,
  workImageStoragePaths,
} from "../lib/content/storage";

function contentTypeFor(path: string): string {
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

async function main(): Promise<void> {
  const projectId =
    process.env.GOOGLE_CLOUD_PROJECT?.trim() ||
    process.env.GCLOUD_PROJECT?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ||
    firebaseProjectId;
  const bucketName = (
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() || firebaseStorageBucket
  ).replace(/^gs:\/\//, "");

  if (getApps().length === 0) {
    initializeApp({ projectId, storageBucket: bucketName });
  }

  const bucket = getStorage().bucket(bucketName);
  const db = getFirestore();

  const uploads: { local: string; dest: string }[] = [
    { local: "public/about/photo.jpg", dest: aboutPhotoStoragePath },
    ...workImageIds.map((id) => ({
      local: `public/work/${id}.png`,
      dest: workImageStoragePaths[id],
    })),
    ...serviceImageIds.map((id) => ({
      local: `public${localServiceImageSrc[id]}`,
      dest: serviceImageStoragePaths[id],
    })),
  ];

  for (const file of uploads) {
    const localPath = resolve(process.cwd(), file.local);
    await readFile(localPath);
    await bucket.upload(localPath, {
      destination: file.dest,
      metadata: {
        contentType: contentTypeFor(file.dest),
        cacheControl: "public, max-age=31536000, immutable",
      },
    });
    console.log(`uploaded gs://${bucketName}/${file.dest}`);
  }

  const aboutPhotoUrl = storageDownloadUrl(aboutPhotoStoragePath, bucketName);
  const work: Record<string, string> = {};
  for (const id of workImageIds) {
    work[id] = storageDownloadUrl(workImageStoragePaths[id], bucketName);
  }
  const services: Record<string, string> = {};
  for (const id of serviceImageIds) {
    services[id] = storageDownloadUrl(serviceImageStoragePaths[id], bucketName);
  }

  await db.doc(contentImagesDocPath).set({ aboutPhotoUrl, work, services });
  console.log(`wrote Firestore ${contentImagesDocPath}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "sync failed";
  console.error(message);
  process.exit(1);
});
