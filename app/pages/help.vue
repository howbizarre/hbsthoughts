<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale } = useI18n();
const localePath = useLocalePath();

const { data: seo } = await useLazyAsyncData('content-seo-help', () => {
  return queryCollection('seo').where('stem', '=', 'seo/help').first();
});

const { data: help } = await useLazyAsyncData('content-static-help', () => {
  return queryCollection('static').path(`/static/${locale.value}/help`).first();
});

const title = computed(() => seo.value?.content.title[locale.value]);
const description = computed(() => seo.value?.content.description[locale.value]);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: title.value
  }
]);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
});
</script>

<template>
  <div class="content px-5">
    <LayoutBreadcrumb :items="breadcrumbItems" />
    <ContentRenderer v-if="help" :value="help" />
  </div>
</template>