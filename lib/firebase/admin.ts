import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { firebaseProjectId, getStorageBucket } from "@/lib/content/storage";

function projectIdFromEnv(): string | undefined {
  const direct =
    process.env.GCLOUD_PROJECT?.trim() ||
    process.env.GOOGLE_CLOUD_PROJECT?.trim() ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  if (direct) return direct;

  const raw = process.env.FIREBASE_CONFIG?.trim();
  if (!raw?.startsWith("{")) return undefined;
  try {
    const parsed = JSON.parse(raw) as { projectId?: unknown };
    return typeof parsed.projectId === "string" ? parsed.projectId : undefined;
  } catch {
    return undefined;
  }
}

function resolvedServiceAccountPath(): string | undefined {
  const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (!raw) return undefined;
  const resolved = path.isAbsolute(raw) ? raw : path.resolve(process.cwd(), raw);
  return existsSync(resolved) ? resolved : undefined;
}

export function hasFirebaseAdminCredentials(): boolean {
  return Boolean(process.env.FIREBASE_CONFIG?.trim() || resolvedServiceAccountPath());
}

export function getFirebaseAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = projectIdFromEnv() ?? firebaseProjectId;
  const storageBucket = getStorageBucket();
  const keyPath = resolvedServiceAccountPath();

  if (keyPath) {
    return initializeApp({
      credential: cert(keyPath),
      projectId,
      storageBucket,
    });
  }

  // App Hosting injects FIREBASE_CONFIG + ADC.
  if (process.env.FIREBASE_CONFIG) {
    return initializeApp();
  }

  return initializeApp({
    projectId,
    storageBucket,
  });
}

export function getContentFirestore(): Firestore {
  return getFirestore(getFirebaseAdminApp());
}
