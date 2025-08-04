<script lang="ts" setup>
const { t, locale } = useI18n();

const { data: seo } = await useLazyAsyncData('content-seo-home', () => {
  return queryCollection('seo').where('stem', '=', 'seo/home').first();
});

const title = computed(() => t('THE_QUESTION'));
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
    <h1 class="text-4xl font-bold">{{ t('THE_QUESTION') }}</h1>
    <p>{{ seo?.content.description[locale] }}</p>
  </div>
</template>