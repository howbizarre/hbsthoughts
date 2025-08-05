<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale, t } = useI18n();
const localePath = useLocalePath();

const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';
const allArticlesRaw = await queryCollection(`${collectionName}`).select('competence').all();

const uniqueCompetence = [...new Set(
  allArticlesRaw
    .map(article => article.competence)
    .flat()
    .filter(Boolean)
)]
  .sort((a, b) => a.localeCompare(b));

const description = {
  "bg": `Кои са компетенциите в сайта.`,
  "en": `What are the competences on the site.`
};

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_COMPETENCE'),
    icon: 'i-heroicons-chart-bar-square'
  }
]);

useSeoMeta({
  title: () => t('LBL_COMPETENCE'),
  description: () => description[(locale.value as 'bg' | 'en')],
  ogTitle: () => t('LBL_COMPETENCE'),
  ogDescription: () => description[(locale.value as 'bg' | 'en')],
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/competence`,
});
</script>

<template>
  <div>
    <LayoutBreadcrumb :items="breadcrumbItems" />
    
    <pre>{{ uniqueCompetence }}</pre>
  </div>
</template>