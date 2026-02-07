import Keycloak from 'keycloak-js';
// import { useAuthStore } from '~~/stores/useAuthStore';
// import { useSystemStore } from '~~/stores/useSystemStore';
// import { useProjectStore } from '~~/stores/useProjectStore';
// import type { KeycloakUser } from '~~/types/auth.interface';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const route = useRoute();
  // const authStore = useAuthStore();
  // const systemStore = useSystemStore();
  // const projectStore = useProjectStore();
  // const portalData = localStorage.getItem('portal_data');
  // if (portalData) {
  //   try {
  //     const parsedPortalData = JSON.parse(portalData);
  //     const portalUser = parsedPortalData.profile || { email: parsedPortalData.email || '' };
  //     // await authStore.setAuth('portal', portalUser, parsedPortalData.token || '');
  //   } catch (error) {
  //     console.error('Failed to restore portal auth state:', error);
  //   }
  //   return;
  // }

  const excludedRoutes = ['/auth/portal'];
  const currentPath = route.path || window.location.pathname;
  if (excludedRoutes.includes(currentPath)) {
    return;
  }

  const cleanupKeycloakHash = () => {
    if (import.meta.server) return;

    const hash = window.location.hash;
    const keycloakParams = ['state', 'session_state', 'code'];

    if (hash && hash.length > 1) {
      try {
        const hashParams = new URLSearchParams(hash.substring(1));
        const hasKeycloakParams = keycloakParams.some((param) => hashParams.has(param));

        if (hasKeycloakParams) {
          if (window.history && window.history.replaceState) {
            const urlWithoutHash = window.location.href.split('#')[0];
            window.history.replaceState(window.history.state, '', urlWithoutHash);
          }
        }
      } catch (error) {
        if (hash.includes('state=') || hash.includes('code=')) {
          if (window.history && window.history.replaceState) {
            const urlWithoutHash = window.location.href.split('#')[0];
            window.history.replaceState(window.history.state, '', urlWithoutHash);
          }
        }
      }
    }
  };

  const keycloak = new Keycloak({
    url: config.public.keycloakUrl,
    realm: config.public.keycloakRealm,
    clientId: config.public.keycloakClientId,
  });

  const initData = async () => {
    try {
      // await authStore.findProfile();
      // await systemStore.getUserPages();
      // await projectStore.getProjects();
    } catch (error) {
      console.error('Failed to initialize data:', error);
    }
  };

  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    });

    if (!authenticated) {
      const publicRoutes = ['/auth/login', '/auth/callback'];
      const currentPath = route.path || window.location.pathname;

      // Check if user is authenticated via portal before redirecting
      const portalData = localStorage.getItem('portal_data');
      // const isPortalAuthenticated =
      //   portalData || (authStore.isAuthenticated && authStore.userPortal);

      // if (!isPortalAuthenticated) {
      //   // await authStore.clearAuth();
      // }

      if (import.meta.client && !publicRoutes.includes(currentPath)) {
        localStorage.removeItem('kc_user');
        window.location.href = '/auth/login';
      }
    } else {
      if (keycloak.tokenParsed) {
        localStorage.setItem('kc_user', JSON.stringify(keycloak.tokenParsed.email));
        // await authStore.setAuth(
        //   'keycloak',
        //   keycloak.tokenParsed as KeycloakUser,
        //   keycloak.token ?? ''
        // );
      } else {
        // await authStore.clearAuth();
      }
      // await authStore.loginWithEmail();
      await initData();
    }

    cleanupKeycloakHash();
    if (import.meta.client) {
      setTimeout(() => {
        cleanupKeycloakHash();
      }, 100);
    }

    nuxtApp.provide('keycloak', keycloak);
  } catch (error) {
    console.error('Keycloak initialization failed', error);
    throw error;
  }
});
