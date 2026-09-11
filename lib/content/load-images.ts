import "server-only";
import {
  isServiceImageId,
  isWorkImageId,
  storageFallbackImages,
  type ContentImages,
} from "@/lib/content/storage";

/** Public Firebase Storage URLs. Objects live under gs://stdops-af357.firebasestorage.app/content/… */
export async function loadContentImages(): Promise<ContentImages> {
  return storageFallbackImages();
}

export function workImageSrc(images: ContentImages, id: string): string | undefined {
  if (!isWorkImageId(id)) return undefined;
  return images.work[id];
}

export function serviceImageSrc(images: ContentImages, id: string): string | undefined {
  if (!isServiceImageId(id)) return undefined;
  return images.services[id];
}
