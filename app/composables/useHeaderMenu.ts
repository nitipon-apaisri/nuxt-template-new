import { useSystemStore } from '~~/stores/useSystemStore';
import { useWindowSize } from './useWindowSize';

export const useHeaderMenu = () => {
  const systemStore = useSystemStore();
  const { isMobile } = useWindowSize();

  // Computed
  const isMenuOpen = computed(() => systemStore.isMenuOpen);
  const isDrawerOpen = computed(() => systemStore.isDrawerOpen);

  // Methods
  const toggleMenu = () => {
    if (isMobile.value) {
      // On mobile, toggle drawer
      systemStore.setIsDrawerOpen(!isDrawerOpen.value);
    } else {
      // On desktop, toggle side menu
      systemStore.setIsMenuOpen(!isMenuOpen.value);
    }
  };

  const openLogoutModal = () => {
    systemStore.setShowLogoutModal(true);
  };

  return {
    isMenuOpen,
    isDrawerOpen,
    isMobile,
    toggleMenu,
    openLogoutModal,
  };
};
