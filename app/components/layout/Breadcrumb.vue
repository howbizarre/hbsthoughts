<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';
defineProps<{ items: BreadcrumbItem[] }>();
</script>

<template>
  <div class="px-5">
    <UBreadcrumb :items="items" />
  </div>
</template>