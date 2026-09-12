"use client";
import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseClientApp() {
  return getApps()[0] ?? initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseClientApp());
}

export async function signInWithEmailPassword(email: string, password: string): Promise<string> {
  const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  return credential.user.getIdToken();
}

export async function signOutOfFirebase(): Promise<void> {
  await signOut(getFirebaseAuth());
}
