import '@testing-library/jest-dom';

/** * 1. PRE-TEST CONFIGURATION & MOCKING
 * We mock environment variables because Jest doesn't load .env files by default.
 */
process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL = 'https://n8n.laparhub.com/webhook/test';
process.env.NEXT_PUBLIC_N8N_WEBHOOK_API_KEY = 'test-api-key-123';

/** * 2. GLOBAL FETCH MOCK
 * We wrap the mock in a Promise + setTimeout. 
 * Why? To simulate real network latency (100ms), giving the component 
 * time to stay in the 'submitting' state so we can verify the loading UI.
 */
global.fetch = jest.fn(() =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve({
        ok: true,
        json: () => Promise.resolve({ 
          data: { aiInsight: "Mocked AI Hint" } 
        }),
      } as Response),
    100) // Give a 100ms delay so the 'submitting' status has time to appear.
  )
) as jest.Mock;