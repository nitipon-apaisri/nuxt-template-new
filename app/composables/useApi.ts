import axios from 'axios';
// import { useAuthStore } from '../../stores/useAuthStore';

export function useApi() {
  // const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const toast = useToast();
  const api = axios.create({
    baseURL: '',
    // baseURL: config.public.apiBaseUrl,
    timeout: 60000, // 60 seconds
  });

  api.interceptors.request.use(async (config) => {
    // Uncomment this when we have authentication
    // if (authStore.isAuthenticated) {
    //   await authStore.updateToken();

    //   // Only set Authorization header if we have an access token
    //   if (authStore.accessToken) {
    //     config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    //   }
    // }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      toast.add({
        icon: 'i-lucide-x-circle',
        title: error.response?.data?.message || 'An error occurred',
        color: 'error',
        close: false,
      });
      if (error.response?.status === 401) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'You are not authorized to access this resource.',
        });
      } else if (error.response?.status === 403) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Forbidden',
          message: 'You are not authorized to access this resource.',
        });
      }
      return Promise.reject(error);
    }
  );

  return { api };
}
