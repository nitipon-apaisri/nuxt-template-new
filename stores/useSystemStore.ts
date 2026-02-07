import { defineStore } from 'pinia';

const LOCALE_STORAGE_KEY = 'app_locale';

export const useSystemStore = defineStore('system', {
  state: () => ({
    locale: 'en',
    isMenuOpen: true,
    isDrawerOpen: false,
    showLogoutModal: false,
  }),
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
      // Persist to localStorage
      if (import.meta.client) {
        localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      }
    },
    initLocale() {
      // Initialize locale from localStorage if available (client-side only)
      if (import.meta.client) {
        const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (savedLocale && (savedLocale === 'en' || savedLocale === 'th')) {
          this.locale = savedLocale;
        }
      }
    },
    setIsMenuOpen(isMenuOpen: boolean) {
      this.isMenuOpen = isMenuOpen;
    },
    setIsDrawerOpen(isDrawerOpen: boolean) {
      this.isDrawerOpen = isDrawerOpen;
    },
    setShowLogoutModal(showLogoutModal: boolean) {
      this.showLogoutModal = showLogoutModal;
    },
  },
});
