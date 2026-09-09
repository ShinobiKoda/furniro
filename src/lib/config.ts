// src/lib/config.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error(
        "NEXT_PUBLIC_API_URL is missing. Please check your .env.local file."
    );
}

export const ENV = {
    API_URL,
};