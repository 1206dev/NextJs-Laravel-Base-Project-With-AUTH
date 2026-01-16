export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

export const AUTH = {
    ACCESS_TOKEN_KEY: "access_token",
    REFRESH_TOKEN_KEY: "refresh_token",
    TOKEN_EXPIRES_DAYS: 7,
};

export const DATE_FORMAT = {
    DEFAULT: "DD/MM/YYYY",
    DATETIME: "DD/MM/YYYY HH:mm:ss",
    API: "YYYY-MM-DD",
};

export const STATUS = {
    ACTIVE: 1,
    INACTIVE: 0,
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
