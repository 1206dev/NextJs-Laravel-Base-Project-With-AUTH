import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (
    date: string | Date | null | undefined,
    format: string = "DD/MM/YYYY"
): string => {
    if (!date) return "";
    return dayjs(date).format(format);
};

export const formatDateTime = (
    date: string | Date | null | undefined,
    format: string = "DD/MM/YYYY HH:mm"
): string => {
    if (!date) return "";
    return dayjs(date).format(format);
};

export const formatDateFromNow = (
    date: string | Date | null | undefined,
    locale: string = "vi"
): string => {
    if (!date) return "";
    return dayjs(date).locale(locale).fromNow();
};

export const formatNumber = (
    value: number | string | null | undefined,
    options?: {
        decimals?: number;
        thousandSeparator?: string;
        decimalSeparator?: string;
        prefix?: string;
        suffix?: string;
    }
): string => {
    if (value === null || value === undefined || value === "") return "";

    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "";

    const {
        decimals = 0,
        thousandSeparator = ",",
        decimalSeparator = ".",
        prefix = "",
        suffix = "",
    } = options || {};

    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");

    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    const result = decPart ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt;

    return `${prefix}${result}${suffix}`;
};

export const formatCurrency = (
    value: number | string | null | undefined,
    currency: string = "VND"
): string => {
    if (value === null || value === undefined || value === "") return "";

    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "";

    if (currency === "VND") {
        return formatNumber(num, { decimals: 0, suffix: " ₫" });
    }

    return formatNumber(num, { decimals: 2, prefix: "$" });
};

export const formatPercent = (
    value: number | string | null | undefined,
    decimals: number = 2
): string => {
    if (value === null || value === undefined || value === "") return "";

    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "";

    return formatNumber(num, { decimals, suffix: "%" });
};

export const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), wait);
    };
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
