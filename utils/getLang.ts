import { allLocales } from "@/utils/allLocales";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export async function getLang(headersList: ReadonlyHeaders) {
  const langHeader = headersList.get("accept-language");

  const primaryLang = langHeader?.split(",")[0]?.split("-")[0]?.toLowerCase() || "en";

  return allLocales().includes(primaryLang) ? primaryLang : "en";
}
