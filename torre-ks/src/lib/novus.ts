import { createPulseClient } from '@kiq/novus-pulse';

const PULSE_URL = process.env.NEXT_PUBLIC_PULSE_URL || process.env.EXPO_PUBLIC_PULSE_URL || 'http://localhost:3000';

// Note: To make authenticated requests, pass the JWT access token here.
// Example: export const pulse = createPulseClient(accessToken, { url: PULSE_URL });

export const pulse = createPulseClient('', { url: PULSE_URL });
