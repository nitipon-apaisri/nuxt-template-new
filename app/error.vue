<script setup lang="ts">
  import type { NuxtError } from '#app';

  const props = defineProps<{
    error: NuxtError;
  }>();
</script>

<template>
  <UError
    :clear="{
      color: 'neutral',
      size: 'xl',
      icon: 'i-lucide-arrow-left',
      class: 'rounded-full',
    }"
    :error="{
      statusCode: props.error.status,
      statusMessage: props.error.statusText,
      message: props.error.message,
    }"
  />
</template>
