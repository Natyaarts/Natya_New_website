const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.natyaarts.com/api';
export const API_URL = rawUrl.includes('3.111.197.92') ? 'https://api.natyaarts.com/api' : rawUrl;
