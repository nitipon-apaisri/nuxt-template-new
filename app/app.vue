<script setup lang="ts">
  import { useSystemStore } from '~~/stores/useSystemStore';
  import AppHeaderMenu from '~/layout/AppHeaderMenu.vue';
  import AppSideMenu from '~/layout/AppSideMenu.vue';
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
        <NuxtLayout>
          <UMain class="flex-1 min-h-0">
            <div class="flex h-full">
              <AppSideMenu class="sticky top-0 shrink-0" />
              <div class="flex-1 p-2 bg-[#F9FAFE] overflow-y-auto dark:bg-gray-900">
                <NuxtPage />
              </div>
            </div>
          </UMain>
        </NuxtLayout>
        <UFooter
          class="sticky bottom-0 z-10 shrink-0"
          :ui="{
            root: 'border-t border-gray-100 dark:border-gray-800 text-xs',
            container: 'py-2 sm:py-0 md:py-0 lg:py-4',
          }"
        >
          © {{ new Date().getFullYear() }} SCGJWD | Dynamic IT Solutions. All rights reserved.
        </UFooter>
      </div>
    </template>
  </UApp>
</template>
