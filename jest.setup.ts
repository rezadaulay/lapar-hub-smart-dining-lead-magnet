import '@testing-library/jest-dom';

/** * 1. MOCK ENVIRONMENT VARIABLES
 * Since these variables are now secret (server-only), 
 * we remove the NEXT_PUBLIC_ prefix.
 */
process.env.N8N_WEBHOOK_URL = 'https://n8n.laparhub.com/webhook/test';
process.env.N8N_WEBHOOK_API_KEY = 'test-api-key-123';

/** * We keep the fetch mock here as a fallback, 
 * but our main focus is mocking the server action in the test file.
 */
global.fetch = jest.fn();