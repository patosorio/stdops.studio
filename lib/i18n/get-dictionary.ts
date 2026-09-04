import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/types";
import { th } from "./dictionaries/th";
import { en } from "./dictionaries/en";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "th":
      return th;
    case "en":
      return en;
  }
}
