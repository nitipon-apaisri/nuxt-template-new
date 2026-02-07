<script setup lang="ts">
  // Stores
  import { useSystemStore } from '~~/stores/useSystemStore';

  // Types
  import type { ViewType } from '~~/types/common.type';

  // Composables
  import * as uiLocales from '@nuxt/ui/locale';
  const config = useRuntimeConfig();

  // Constants

  const { locale: i18nLocale, setLocale: setI18nLocale } = useI18n();
  const localesList = Object.values(uiLocales).filter(
    (loc) => loc.code === 'en' || loc.code === 'th'
  );

  const layoutList = [
    {
      label: 'Default',
      value: 'default',
    },
    {
      label: 'Cosmic',
      value: 'cosmic',
    },
  ];

  const emit = defineEmits<{
    (e: 'update:currentView', value: ViewType): void;
    (e: 'openLogoutModal'): void;
    (e: 'goBack'): void;
    (e: 'onChangeView', view: ViewType): void;
  }>();

  defineProps<{
    currentView: ViewType;
  }>();

  const buttonProps = {
    size: 'md' as const,
    color: 'neutral' as const,
    variant: 'ghost' as const,
    class: 'w-full px-2 py-2',
  };

  // Stores
  const systemStore = useSystemStore();
  const router = useRouter();
  // Computed
  const selectedLocale = computed({
    get: () => i18nLocale.value as string,
    set: (newLocale: string) => {
      if (newLocale && (newLocale === 'en' || newLocale === 'th')) {
        setI18nLocale(newLocale as 'en' | 'th');
        systemStore.setLocale(newLocale);
      }
    },
  });

  // Methods
  const goBack = () => {
    emit('goBack');
  };
  const openLogoutModal = () => {
    emit('openLogoutModal');
  };
  const onChangeView = (view: ViewType) => {
    emit('onChangeView', view);
  };

  // Computed
</script>

<template>
  <div class="w-64 flex flex-col gap-2 p-2">
    <!-- Main Menu -->
    <template v-if="currentView === 'main'">
      <UButton :icon="'i-lucide-user'" v-bind="buttonProps">
        <div class="w-full flex items-center justify-between">
          <span class="text-xs font-bold">{{ $t('general.profile') }}</span>
        </div>
      </UButton>
      <div class="px-2">
        <USeparator />
      </div>
      <UButton icon="i-lucide-globe" v-bind="buttonProps" @click="onChangeView('language')">
        <span class="text-xs font-bold">{{ $t('general.language') }}</span>
      </UButton>
      <UButton icon="i-lucide-moon-star" v-bind="buttonProps" @click="onChangeView('appearance')">
        <span class="text-xs font-bold">{{ $t('general.appearance') }}</span>
      </UButton>
      <div class="px-1">
        <USeparator />
      </div>
      <div class="w-full">
        <div
          class="flex justify-between items-center gap-2 rounded-md bg-primary-50 px-2 py-1 dark:bg-primary-900"
        >
          <div class="w-fit flex items-center pr-2 rounded-md gap-1">
            <UIcon name="lucide:monitor" class="text-primary" />
            <span class="text-xs font-bold">Frontend</span>
          </div>
          <div class="w-fit flex items-center p-2 bg-primary-50 rounded-md dark:bg-primary-900">
            <span class="text-xs font-bold text-primary">1.0.0</span>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex justify-between items-center gap-2 rounded-md bg-success/10 px-2 py-1">
          <div class="w-fit flex items-center pr-2 rounded-md gap-1">
            <UIcon name="lucide:layers" class="text-success" />
            <span class="text-xs font-bold">Backend</span>
          </div>
          <div class="w-fit flex items-center p-2 rounded-md">
            <span class="text-xs font-bold text-success">1.0.0</span>
          </div>
        </div>
      </div>
      <div class="px-1">
        <USeparator />
      </div>
      <UButton icon="i-lucide-log-out" v-bind="buttonProps" @click="openLogoutModal">
        <span class="text-xs font-bold">{{ $t('general.logout') }}</span>
      </UButton>
    </template>

    <!-- Appearance View -->
    <template v-if="currentView === 'appearance'">
      <UButton icon="i-lucide-arrow-left" v-bind="buttonProps" @click="goBack">
        <span class="text-xs font-bold">{{ $t('general.back') }}</span>
      </UButton>
      <div class="px-2">
        <USeparator />
      </div>
      <div class="w-full p-2 flex items-center justify-between">
        <span class="text-xs font-bold">{{ $t('general.dark-mode') }}</span>
        <UColorModeSwitch :ui="{ icon: 'text-lg' }" />
      </div>
      <!-- <div class="w-full p-2 flex items-center justify-between">
        <span class="text-xs font-bold">{{ $t('general.layout') }}</span>
        <UTabs
          size="xs"
          :items="layoutList"
          v-model="selectedLayout"
          @change="onChangeLayout"
          :ui="{ root: 'justify-center gap-0' }"
        />
      </div> -->
    </template>

    <!-- Language View -->
    <template v-if="currentView === 'language'">
      <UButton icon="i-lucide-arrow-left" v-bind="buttonProps" @click="goBack">
        <span class="text-xs font-bold">{{ $t('general.back') }}</span>
      </UButton>
      <div class="px-2">
        <USeparator />
      </div>
      <ULocaleSelect v-model="selectedLocale" :locales="localesList" class="w-full" />
    </template>

    <!-- QR Code View -->
    <template v-if="currentView === 'qrcode'">
      <UButton icon="i-lucide-arrow-left" v-bind="buttonProps" @click="goBack">
        <span class="text-xs font-bold">{{ $t('general.back') }}</span>
      </UButton>
      <div class="px-2">
        <USeparator />
      </div>
      <!-- <div class="p-2 rounded-md flex flex-col items-center justify-center">
        <img
          v-if="systemStore.qrCodeUrl && !systemStore.loadingQrCode"
          :src="systemStore.qrCodeUrl"
          class="w-full h-full"
        />
        <div v-if="systemStore.loadingQrCode" class="p-8">
          <Loader />
        </div>
        <p class="text-xs text-gray-500 text-center mt-2">
          {{ $t('messages.qr-code-login-message') }}
        </p>
      </div> -->
    </template>
  </div>
</template>
