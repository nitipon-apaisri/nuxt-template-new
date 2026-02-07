import type { ViewType } from '~~/types/common.type';
import { useSystemStore } from '~~/stores/useSystemStore';
import { useWindowSize } from './useWindowSize';

export const useHeaderMenu = () => {
  const systemStore = useSystemStore();
  const { isMobile } = useWindowSize();

  // Refs
  const currentView = ref<ViewType>('main');

  // Computed
  const isMenuOpen = computed(() => systemStore.isMenuOpen);
  const isDrawerOpen = computed(() => systemStore.isDrawerOpen);

  // Methods
  const goBack = () => {
    currentView.value = 'main';
  };

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

  const onChangeView = (view: ViewType) => {
    currentView.value = view;
  };

  return {
    currentView,
    isMenuOpen,
    isDrawerOpen,
    isMobile,
    goBack,
    toggleMenu,
    openLogoutModal,
    onChangeView,
  };
};
