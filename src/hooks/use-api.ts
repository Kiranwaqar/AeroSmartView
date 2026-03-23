import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/lib/config';

/**
 * Fetch metrics from the backend API
 */
export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.METRICS);
      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }
      return response.json();
    },
    staleTime: 10000, // 10 seconds
    retry: 3,
  });
};

/**
 * Fetch systems from the backend API
 */
export const useSystems = () => {
  return useQuery({
    queryKey: ['systems'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.SYSTEMS);
      if (!response.ok) {
        throw new Error('Failed to fetch systems');
      }
      return response.json();
    },
    staleTime: 10000, // 10 seconds
    retry: 3,
  });
};

/**
 * Fetch analytics from the backend API
 */
export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.ANALYTICS);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      return response.json();
    },
    staleTime: 30000, // 30 seconds
    retry: 3,
  });
};

/**
 * Check backend API health
 */
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.HEALTH);
      if (!response.ok) {
        throw new Error('Backend API is not available');
      }
      return response.json();
    },
    staleTime: 5000, // 5 seconds
    retry: 1,
  });
};
