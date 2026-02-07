<script setup lang="ts">
  import user from '~/data/user.json';

  // Composables
  import { useWindowSize } from '~/composables/useWindowSize';
  import { useHeaderMenu } from '~/composables/useHeaderMenu';
  import { useSystemStore } from '~~/stores/useSystemStore';

  // Stores
  const systemStore = useSystemStore();
  const { isMobile } = useWindowSize();
  const { toggleMenu, currentView, goBack, openLogoutModal, onChangeView } = useHeaderMenu();

  // Components
  import ProfilePopover from '~/components/popover/ProfilePopover.vue';
</script>

<template>
  <div
    class="w-full p-3 border-b border-gray-100 dark:border-gray-800 mx-0 flex items-center justify-between"
    style="background: linear-gradient(90deg, #026 53.5%, #0054ff 76.5%, #ef5c23)"
  >
    <!-- Orange Section (Left) -->
    <div class="flex items-center gap-1 sm:gap-2 min-w-0 sm:min-w-[319px] h-full shrink-0">
      <UButton
        icon="i-lucide-menu"
        size="md"
        variant="ghost"
        @click="toggleMenu"
        :ui="{ base: 'active:bg-transparent hover:bg-transparent', leadingIcon: 'text-white' }"
      />
      <div class="flex items-center gap-2">
        <h1
          class="text-2xl font-bold bg-linear-to-r from-white via-[#ffc38f] to-[#ff8d8d] bg-clip-text text-transparent truncate"
        >
          COSMIC CRM
        </h1>
      </div>
    </div>

    <!-- Bright Blue Section (Middle) -->
    <div v-if="!isMobile" class="flex items-center gap-2 h-full">
      <UPopover
        :content="{
          sideOffset: 8,
        }"
      >
        <div class="flex gap-2 justify-end items-center cursor-pointer">
          <div
            class="w-fit flex gap-2 items-center bg-white/10 rounded-md p-2 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            <div class="bg-white rounded-full p-0.5">
              <UAvatar :src="''" :alt="user.name" size="sm" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <p class="max-w-30 text-xs font-bold text-white truncate">
                  {{ user.name }}
                </p>
              </div>
            </div>
            <UButton
              icon="i-lucide-chevron-down"
              size="md"
              variant="ghost"
              :ui="{ base: 'hover:bg-transparent', leadingIcon: 'text-white' }"
            />
          </div>
        </div>

        <template #content>
          <ProfilePopover
            :currentView="currentView"
            @goBack="goBack"
            @openLogoutModal="openLogoutModal"
            @onChangeView="onChangeView"
          />
        </template>
      </UPopover>
    </div>
  </div>
</template>

<style scoped>
  .header-triangle-section {
    clip-path: polygon(50px 0, 100% 0, 100% 100%, 0 100%);
    margin-left: -50px;
  }
</style>
