<script setup lang="ts">
  import { useSystemStore } from '../../stores/useSystemStore';
  import MenuContent from '~/layout/MenuContent.vue';
  import { useWindowSize } from '../composables/useWindowSize';
  const systemStore = useSystemStore();
  const isMenuOpen = computed(() => systemStore.isMenuOpen);
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  const route = useRoute();

  // Pages that want to control menu state themselves
  const pagesWithCustomMenuState = ['/employee_overview/check-inout'];

  watch(
    [isMobile, isTablet, isDesktop],
    ([mobile, tablet, desktop]) => {
      // Check if current route wants to control menu state
      const shouldRespectPageControl = pagesWithCustomMenuState.some((path) =>
        route.path.includes(path)
      );

      if (mobile) {
        if (systemStore.isDrawerOpen) {
          systemStore.setIsDrawerOpen(false);
        }
      } else if (tablet) {
        // Only set menu state if page doesn't control it
        if (!shouldRespectPageControl) {
          systemStore.setIsMenuOpen(false);
        }
      } else if (desktop) {
        // Only set menu state if page doesn't control it
        if (!shouldRespectPageControl) {
          systemStore.setIsMenuOpen(true);
        }
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div
    v-if="!isMobile"
    :class="{ collapsed: !isMenuOpen, expanded: isMenuOpen }"
    class="left-0 h-full overflow-y-auto bg-white border-r border-gray-100 transition-width duration-300 relative dark:bg-gray-900 dark:border-gray-800 dark:text-white"
  >
    <MenuContent />
  </div>
</template>

<style scoped>
  .collapsed {
    width: 80px;
  }
  .expanded {
    min-width: 320px;
    width: 320px;
  }
  .transition-width {
    transition: width 0.3s ease-in-out;
  }
</style>
