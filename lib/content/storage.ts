export const firebaseProjectId = "stdops-af357";
export const firebaseStorageBucket = "stdops-af357.firebasestorage.app";

export const workImageIds = [
  "case-supermarket",
  "case-pharma",
  "case-mfg",
  "case-fintech",
  "case-royalties",
] as const;

export type WorkImageId = (typeof workImageIds)[number];

export const aboutPhotoStoragePath = "content/about/photo.jpg";

export const workImageStoragePaths: Record<WorkImageId, string> = {
  "case-supermarket": "content/work/case-supermarket.png",
  "case-pharma": "content/work/case-pharma.png",
  "case-mfg": "content/work/case-mfg.png",
  "case-fintech": "content/work/case-fintech.png",
  "case-royalties": "content/work/case-royalties.png",
};

export const serviceImageIds = ["workspace", "web", "ai", "data"] as const;

export type ServiceImageId = (typeof serviceImageIds)[number];

export const serviceImageStoragePaths: Record<ServiceImageId, string> = {
  workspace: "content/services/snapshot-workspace-automation.png",
  web: "content/services/snapshot-business-website.png",
  ai: "content/services/snapshot-ai-flows.png",
  data: "content/services/snapshot-data-engineering.png",
};

export const localAboutPhotoSrc = "/about/photo.jpg";

export const localWorkImageSrc: Record<WorkImageId, string> = {
  "case-supermarket": "/work/case-supermarket.png",
  "case-pharma": "/work/case-pharma.png",
  "case-mfg": "/work/case-mfg.png",
  "case-fintech": "/work/case-fintech.png",
  "case-royalties": "/work/case-royalties.png",
};

export const localServiceImageSrc: Record<ServiceImageId, string> = {
  workspace: "/services/snapshot-workspace-automation.png",
  web: "/services/snapshot-business-website.png",
  ai: "/services/snapshot-ai-flows.png",
  data: "/services/snapshot-data-engineering.png",
};

export const contentImagesDocPath = "content/images";
export const contactMessagesCollection = "contactMessages";
export const blogPostsCollection = "blogPosts";

export type ContentImages = {
  aboutPhotoUrl: string;
  work: Record<WorkImageId, string>;
  services: Record<ServiceImageId, string>;
};

export function isWorkImageId(value: string): value is WorkImageId {
  return (workImageIds as readonly string[]).includes(value);
}

export function isServiceImageId(value: string): value is ServiceImageId {
  return (serviceImageIds as readonly string[]).includes(value);
}

export function getStorageBucket(): string {
  const fromEnv = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim();
  const raw = fromEnv || firebaseStorageBucket;
  return raw.replace(/^gs:\/\//, "");
}

/** Public download URL. Works when Storage rules allow read on `content/**`. */
export function storageDownloadUrl(objectPath: string, bucket = getStorageBucket()): string {
  const encoded = encodeURIComponent(objectPath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encoded}?alt=media`;
}

export function storageFallbackImages(): ContentImages {
  return {
    aboutPhotoUrl: storageDownloadUrl(aboutPhotoStoragePath),
    work: {
      "case-supermarket": storageDownloadUrl(workImageStoragePaths["case-supermarket"]),
      "case-pharma": storageDownloadUrl(workImageStoragePaths["case-pharma"]),
      "case-mfg": storageDownloadUrl(workImageStoragePaths["case-mfg"]),
      "case-fintech": storageDownloadUrl(workImageStoragePaths["case-fintech"]),
      "case-royalties": storageDownloadUrl(workImageStoragePaths["case-royalties"]),
    },
    services: {
      workspace: storageDownloadUrl(serviceImageStoragePaths.workspace),
      web: storageDownloadUrl(serviceImageStoragePaths.web),
      ai: storageDownloadUrl(serviceImageStoragePaths.ai),
      data: storageDownloadUrl(serviceImageStoragePaths.data),
    },
  };
}

export function localFallbackImages(): ContentImages {
  return {
    aboutPhotoUrl: localAboutPhotoSrc,
    work: { ...localWorkImageSrc },
    services: { ...localServiceImageSrc },
  };
}
