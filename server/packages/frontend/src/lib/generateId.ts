/**
 * Generates a random ID using the Web Crypto API.
 * The ID is formatted as a base64 string.
 * 
 * @param length - Length of the random ID to generate
 * @returns A random ID string
 */
export default function generateId(length: number = 16): string {
    // Generate random bytes
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    
    // Convert to base64 and remove padding
    return btoa(String.fromCharCode.apply(null, Array.from(bytes)))
        .replace(/\+/g, '-')  // URL-safe
        .replace(/\//g, '_')  // URL-safe
        .replace(/=+$/, '');  // Remove padding
} 