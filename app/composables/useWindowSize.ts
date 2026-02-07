// app/composables/useWindowSize.ts
export function useWindowSize() {
  const windowWidth = ref(0);
  const windowHeight = ref(0);

  const MOBILE_BREAKPOINT = 480;
  const TABLET_BREAKPOINT = 1024;

  const isMobile = computed(() => windowWidth.value <= MOBILE_BREAKPOINT);
  const isTablet = computed(
    () => windowWidth.value > MOBILE_BREAKPOINT && windowWidth.value <= TABLET_BREAKPOINT
  );
  const isDesktop = computed(() => windowWidth.value > TABLET_BREAKPOINT);

  let resizeTimer: ReturnType<typeof setTimeout> | null = null;

  const updateWindowSize = () => {
    if (import.meta.client) {
      // Debounce resize events
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        windowWidth.value = window.innerWidth;
        windowHeight.value = window.innerHeight;
      }, 150);
    }
  };

  onMounted(() => {
    if (import.meta.client) {
      windowWidth.value = window.innerWidth;
      windowHeight.value = window.innerHeight;
      window.addEventListener('resize', updateWindowSize);
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      window.removeEventListener('resize', updateWindowSize);
      if (resizeTimer) clearTimeout(resizeTimer);
    }
  });

  return {
    windowWidth,
    windowHeight,
    isMobile,
    isTablet,
    isDesktop,
  };
}
