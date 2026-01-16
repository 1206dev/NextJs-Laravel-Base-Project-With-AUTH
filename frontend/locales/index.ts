import { en } from "./en";
import { vi } from "./vi";

export type Locale = "en" | "vi";

export const locales = {
    en,
    vi,
};

export const defaultLocale: Locale = "vi";

export function getTranslation(locale: Locale = defaultLocale) {
    return locales[locale];
}

export { en, vi };
