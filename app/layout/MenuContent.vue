<script setup lang="ts">
  import { useSystemStore } from '../../stores/useSystemStore';
  import type { MenuItem } from '~~/types/menu.interface';

  const systemStore = useSystemStore();
  const isMenuOpen = computed(() => systemStore.isMenuOpen);
  const route = useRoute();
  const openSubmenus = ref<Set<string>>(new Set());
  const searchMenu = ref('');
  // const menuItems = computed<MenuItem[]>(() => systemStore.menuItems);
  const menuItems = ref<MenuItem[]>([{ label: 'Home', icon: 'lucide:home', to: '/' }]);

  // Props to control behavior
  const props = defineProps({
    showSearch: {
      type: Boolean,
      default: true,
    },
    alwaysExpanded: {
      type: Boolean,
      default: false,
    },
  });

  // Emit events
  const emit = defineEmits<{
    (e: 'menuItemClick'): void;
  }>();

  const isExpanded = computed(() => props.alwaysExpanded || isMenuOpen.value);

  // Function to check if a menu item is active
  const isActive = (item: MenuItem): boolean => {
    if (item.to && route.path === item.to) {
      return true;
    }
    if (item.children) {
      return item.children.some((child: MenuItem) => child.to === route.path);
    }
    return false;
  };

  // Function to toggle submenu
  const toggleSubmenu = (value: string) => {
    if (openSubmenus.value.has(value)) {
      openSubmenus.value.delete(value);
    } else {
      openSubmenus.value.add(value);
    }
  };

  const filteredMenuItems = computed(() => {
    const query = searchMenu.value?.toLowerCase() || '';
    if (!query) return menuItems.value;

    const filtered = menuItems.value
      .filter((item: MenuItem) => item.label !== 'home')
      .map((item: MenuItem) => {
        const parentMatch = item.label.toLowerCase().includes(query);
        const matchingChildren = item.children?.filter((child: MenuItem) =>
          child.label.toLowerCase().includes(query)
        );

        if (parentMatch) return { ...item, children: item.children || [] };
        if (matchingChildren?.length) return { ...item, children: matchingChildren };
        return null;
      })
      .filter(
        (
          item: (MenuItem & { children: MenuItem[] }) | null
        ): item is MenuItem & { children: MenuItem[] } => item !== null
      );
    const homeItem = menuItems.value.find((item: MenuItem) => item.label === 'home');
    if (homeItem) filtered.unshift({ ...homeItem, children: homeItem.children || [] });

    return filtered;
  });

  // Auto-open submenu if it contains the active route
  watch(
    () => route.path,
    () => {
      if (isExpanded.value) {
        menuItems.value.forEach((item: MenuItem) => {
          if (item.children) {
            const hasActiveChild = item.children.some((child: MenuItem) => child.to === route.path);
            if (hasActiveChild && item.value) {
              openSubmenus.value.add(item.value);
            }
          }
        });
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div class="w-full h-full overflow-y-auto bg-white dark:bg-gray-900">
    <div class="pt-4 pb-2 px-4" v-if="props.showSearch && isExpanded">
      <UInput
        v-model="searchMenu"
        :placeholder="$t('general.search-menu')"
        leadingIcon="i-lucide-search"
        :ui="{ root: `w-full` }"
      />
    </div>
    <nav class="flex flex-col gap-1 py-4 px-2 md:px-4 lg:px-2 xl:px-4">
      <ul class="flex flex-col gap-1 w-full">
        <li v-for="item in filteredMenuItems" :key="item.value || item.label" class="w-full">
          <!-- Menu item with link -->
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            :class="[
              'flex items-center gap-2 min-h-10 px-2 rounded-md transition-colors',
              isExpanded ? 'justify-start' : 'justify-center',
              isActive(item)
                ? 'bg-scgjwd-night-blue text-white font-medium dark:text-white dark:bg-gray-800'
                : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900',
            ]"
            :title="!isExpanded ? item.label : undefined"
            @click="$emit('menuItemClick')"
          >
            <!-- <span class="material-icons" :style="{ 'font-size': !isExpanded ? '20px' : '16px' }">
              {{ item.icon }}
            </span> -->
            <UIcon :name="item.icon" class="w-4 h-4 shrink-0" />
            <p v-if="isExpanded" class="text-xs md:text-xs whitespace-nowrap">
              {{
                item.label == 'Home'
                  ? $t('general.home')
                  : item.label == 'Employee Check In/Out'
                    ? $t('menu.employee-check-inout')
                    : item.label
              }}
            </p>
          </NuxtLink>

          <!-- Menu item with children (submenu) -->
          <div v-else class="w-full">
            <button
              :class="[
                'flex items-center gap-2 min-h-10 px-2 rounded-md transition-colors w-full',
                isExpanded ? 'justify-start' : 'justify-center',
                'text-gray-700 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800',
              ]"
              @click="item.value && toggleSubmenu(item.value)"
              :title="!isExpanded ? item.label : undefined"
            >
              <!-- <span class="material-icons" :style="{ 'font-size': !isExpanded ? '20px' : '16px' }">
                {{ item.icon }}
              </span> -->
              <UIcon :name="item.icon" class="w-4 h-4 shrink-0" />
              <p v-if="isExpanded" class="text-xs md:text-xs whitespace-nowrap flex-1 text-left">
                {{ item.label == 'Home' ? $t('general.home') : item.label }}
              </p>
              <UIcon
                v-if="isExpanded && item.children"
                :name="
                  openSubmenus.has(item.value || '')
                    ? 'i-lucide-chevron-up'
                    : 'i-lucide-chevron-down'
                "
                class="w-4 h-4 shrink-0 transition-transform duration-300"
              />
            </button>

            <!-- Children submenu -->
            <Transition
              enter-active-class="submenu-enter-active"
              leave-active-class="submenu-leave-active"
              enter-from-class="submenu-enter-from"
              enter-to-class="submenu-enter-to"
              leave-from-class="submenu-leave-from"
              leave-to-class="submenu-leave-to"
            >
              <ul
                v-if="item.children && openSubmenus.has(item.value || '')"
                :class="[
                  'flex flex-col gap-1 mt-1',
                  isExpanded ? 'ml-4 pl-3 border-l-2 border-gray-200 dark:border-gray-800' : '',
                ]"
              >
                <li v-for="child in item.children" :key="child.value || child.label" class="w-full">
                  <NuxtLink
                    v-if="child.to"
                    :to="child.to"
                    :class="[
                      'flex items-center gap-2 min-h-10 px-2 rounded-md transition-colors',
                      isExpanded ? 'justify-start' : 'justify-center',
                      isActive(child)
                        ? 'bg-scgjwd-night-blue text-white font-medium dark:text-white dark:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-700',
                    ]"
                    :title="!isExpanded ? child.label : undefined"
                    @click="$emit('menuItemClick')"
                  >
                    <span
                      class="material-icons"
                      :style="{ 'font-size': !isExpanded ? '20px' : '16px' }"
                    >
                      {{ child.icon }}
                    </span>
                    <p v-if="isExpanded" class="text-xs whitespace-nowrap">
                      {{ child.label }}
                    </p>
                  </NuxtLink>
                </li>
              </ul>
            </Transition>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
  /* Submenu transition animations */
  .submenu-enter-active,
  .submenu-leave-active {
    transition: all 0.1s ease-in-out;
    overflow: hidden;
  }
  .submenu-enter-from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  .submenu-enter-to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
  .submenu-leave-from {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
  .submenu-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
</style>
