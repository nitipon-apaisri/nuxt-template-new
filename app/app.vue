<script setup lang="ts">
  import { useSystemStore } from '~~/stores/useSystemStore';
  import AppHeaderMenu from '~/layout/AppHeaderMenu.vue';
  const route = useRoute();
  const systemStore = useSystemStore();

  // Computed
  const showLayout = computed(() => route.meta.layout !== false);
</script>
<template>
  <UApp>
    <template v-if="showLayout">
      <div class="flex flex-col h-screen">
        <AppHeaderMenu class="sticky top-0 z-10 shrink-0" />
      </div>
    </template>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
