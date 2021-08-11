export const NEXT_URL = 'NEXT_URL';

export function nextUrl(url) {
    return {
        type: NEXT_URL,
        url,
    }
}