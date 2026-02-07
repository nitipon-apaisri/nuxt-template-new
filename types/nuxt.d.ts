import type Keycloak from 'keycloak-js';

declare module '#app' {
  interface NuxtApp {
    $keycloak: Keycloak | undefined;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $keycloak: Keycloak | undefined;
  }
}

export {};
