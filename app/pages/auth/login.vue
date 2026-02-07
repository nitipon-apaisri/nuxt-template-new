<template></template>

<script setup lang="ts">
  // import { useAuthStore } from '~~/stores/useAuthStore';

  definePageMeta({
    layout: false,
  });

  // const authStore = useAuthStore();
  const nuxtApp = useNuxtApp();
  const router = useRouter();

  onMounted(async () => {
    try {
      // Wait for Keycloak plugin to initialize
      await nextTick();

      // Wait a bit more for Keycloak plugin to finish
      await new Promise((resolve) => setTimeout(resolve, 200));
      // Check if already authenticated via auth store (most reliable)
      // if (authStore.userKeycloak && authStore.token) {
      //   await router.push('/');
      //   return;
      // }

      // If we have portal_data (portal user), don't try Keycloak login
      const portalData = localStorage.getItem('portal_data');
      if (portalData) {
        // Portal user, redirect to home
        await router.push('/');
        return;
      }

      // Check Keycloak instance
      const keycloak = nuxtApp.$keycloak as import('keycloak-js').default | undefined;
      if (!keycloak) {
        window.location.href = '/';
        return;
      }
      // If Keycloak is authenticated but auth store isn't updated yet, wait a bit more
      if (keycloak && keycloak.authenticated) {
        // Wait for plugin to update auth store
        await new Promise((resolve) => setTimeout(resolve, 300));
        // if (authStore.userKeycloak) {
        await router.push('/');
        return;
      }

      // Initiate Keycloak login if not authenticated
      if (keycloak && typeof keycloak.login === 'function') {
        await keycloak.login({
          redirectUri: window.location.origin + '/auth/login',
        });
      }
    } catch (error) {
      console.error('Failed to initiate login:', error);
    }
  });
</script>
