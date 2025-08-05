<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale, t } = useI18n();
const localePath = useLocalePath();

const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';
const allArticles = await queryCollection(`${collectionName}`).select('tags').all();
const allTags = allArticles
  .flatMap(article => Array.isArray(article.tags) ? article.tags : [])
  .filter(Boolean);

const uniqueTags = [...new Set(allTags)];

const description = {
  "bg": `Всички активни тагове в сайта.`,
  "en": `All active tags on the site.`
};

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_TAGS'),
    icon: 'i-heroicons-tag'
  }
]);

useSeoMeta({
  title: () => t('LBL_TAGS'),
  description: () => description[(locale.value as 'bg' | 'en')],
  ogTitle: () => t('LBL_TAGS'),
  ogDescription: () => description[(locale.value as 'bg' | 'en')],
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/tag`,
});
</script>

<template>
  <div>
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <pre>{{ uniqueTags }}</pre>
  </div>
</template>