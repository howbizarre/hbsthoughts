<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';
defineProps<{ items: BreadcrumbItem[] }>();
</script>

<template>
  <div><UBreadcrumb :items="items" /></div>
</template>