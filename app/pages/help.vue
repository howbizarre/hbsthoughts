<script lang="ts" setup>
const { t, locale } = useI18n();

const { data: seo } = await useLazyAsyncData('content-seo-home', () => {
  return queryCollection('seo').where('stem', '=', 'seo/home').first();
});

const { data: help } = await useLazyAsyncData('content-static-help', () => {
  return queryCollection('static').path(`/static/${locale.value}/help`).first();
});

const title = computed(() => seo.value?.content.title[locale.value]);
const description = computed(() => seo.value?.content.description[locale.value]);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
});
</script>

<template>
  <div>
    <ContentRenderer v-if="help" :value="help" />
  </div>
</template>