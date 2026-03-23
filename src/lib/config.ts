// Frontend environment configuration
export const API_URL = 
  import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:3001' : window.location.origin);

export const API_ENDPOINTS = {
  HEALTH: `${API_URL}/api/health`,
  METRICS: `${API_URL}/api/metrics`,
  SYSTEMS: `${API_URL}/api/systems`,
  ANALYTICS: `${API_URL}/api/analytics`,
} as const;

export const isProduction = !import.meta.env.DEV;
