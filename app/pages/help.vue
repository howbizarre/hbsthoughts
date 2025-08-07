<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale } = useI18n();
const localePath = useLocalePath();

const { data: seo } = await useLazyAsyncData('content-seo-help', () => {
  return queryCollection('seo').where('stem', '=', 'seo/help').first();
});

const { data: help } = await useLazyAsyncData(
  () => `${locale.value}-static-help`,
  async () => {
    const collectionName = `${locale.value}_static` as 'bg_static' | 'en_static';
    return await queryCollection(collectionName).path(`/${locale.value}/static/help`).first();
  }, {
  server: true,
  watch: [locale]
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
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/help`
});

useJsonLdBreadcrumbs(breadcrumbItems.value);
</script>

<template>
  <div class="content">
    <LayoutBreadcrumb :items="breadcrumbItems" />
    <ContentRenderer v-if="help" :value="help" class="px-5" />
  </div>
</template>