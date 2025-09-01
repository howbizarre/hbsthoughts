<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale, t } = useI18n();
const localePath = useLocalePath();

const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';
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
    label: t('LBL_HOME'),
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_COMPETENCIES'),
    icon: 'i-heroicons-chart-bar-square',
    to: localePath('/competence')
  }
]);

useSeoMeta({
  title: () => t('LBL_COMPETENCIES'),
  description: () => description[(locale.value as 'bg' | 'en')],
  ogTitle: () => t('LBL_COMPETENCIES'),
  ogDescription: () => description[(locale.value as 'bg' | 'en')],
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/competence`,
});

useJsonLdBreadcrumbs(breadcrumbItems);
</script>

<template>
  <div class="grid grid-cols-1 gap-10">
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <h1 class="text-3xl font-medium px-5 m-0">
      <UIcon name="i-heroicons-chart-bar-square" class="size-5" /> {{ t('LBL_COMPETENCIES') }}
    </h1>

    <div class="excerpt-card text-center">
      <div class="absolute inline-flex items-center justify-center text-xs px-2 py-1 bg-white text-black dark:bg-black dark:text-white mr-0.5 rounded-full -top-2 -end-2">
        {{ t("LBL_COMPETENCIES") }}
      </div>

      <template v-for="(doc, index) in uniqueCompetence" :key="`${doc}-${index}`">
        <NuxtLink :to="localePath(`/competence/${doc}`)"
                  class="bg-white/50 text-black/75 hover:bg-white hover:text-black dark:bg-black/50 dark:text-white/75 dark:hover:bg-black dark:hover:text-white transition-colors ease-in-out duration-300 py-1 px-2 m-1 sm:mx-1 rounded-xl text-md inline-block">
          {{ t((`COMPETENCE_${doc}`).toUpperCase()) }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>