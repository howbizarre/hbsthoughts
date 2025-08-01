<script lang="ts" setup>
const { t, locale } = useI18n();

const { data: seo } = await useAsyncData('content-landing-seo', () => {
  return queryCollection('landing').where('stem', '=', 'landing/seo').first();
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
    <h1 class="text-4xl font-bold">{{ t('THE_QUESTION') }}</h1>
    <ButtonColorMode />
    <ButtonLangSwitcher />
    <pre>{{ seo?.content.description[locale] }}</pre>
  </div>
</template>