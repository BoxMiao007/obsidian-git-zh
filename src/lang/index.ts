import en from "./en";
import zhCN from "./zh-cn";

export type LanguageKey = "en" | "zh-cn";

const languages: Record<LanguageKey, typeof en> = {
    en,
    "zh-cn": zhCN,
};

// Current language - default to Chinese for this localized version
let currentLanguage: LanguageKey = "zh-cn";

/**
 * Get the current language
 */
export function getCurrentLanguage(): LanguageKey {
    return currentLanguage;
}

/**
 * Set the current language
 */
export function setLanguage(lang: LanguageKey): void {
    if (languages[lang]) {
        currentLanguage = lang;
    }
}

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
    const keys = path.split(".");
    let result: unknown = obj;
    
    for (const key of keys) {
        if (result && typeof result === "object" && key in result) {
            result = (result as Record<string, unknown>)[key];
        } else {
            return undefined;
        }
    }
    
    return typeof result === "string" ? result : undefined;
}

/**
 * Replace template variables in a string
 * Supports {{variable}} syntax
 */
function replaceTemplates(str: string, vars: Record<string, string | number>): string {
    return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        return vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`;
    });
}

/**
 * Translation function
 * @param key - Dot notation key for the translation string
 * @param vars - Optional variables to replace in the template
 * @returns Translated string
 */
export function t(key: string, vars?: Record<string, string | number>): string {
    const lang = languages[currentLanguage];
    let text = getNestedValue(lang as unknown as Record<string, unknown>, key);
    
    // Fallback to English if not found in current language
    if (text === undefined && currentLanguage !== "en") {
        text = getNestedValue(en as unknown as Record<string, unknown>, key);
    }
    
    // Return key if translation not found
    if (text === undefined) {
        return key;
    }
    
    // Replace template variables if provided
    if (vars) {
        text = replaceTemplates(text, vars);
    }
    
    return text;
}

/**
 * Get the full translation object for direct access
 */
export function getTranslations(): typeof en {
    return languages[currentLanguage];
}

// Export language objects for direct access if needed
export { en, zhCN };
