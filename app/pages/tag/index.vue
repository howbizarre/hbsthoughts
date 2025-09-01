<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale, t } = useI18n();
const localePath = useLocalePath();

const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';
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
    label: t('LBL_HOME'),
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_TAGS'),
    icon: 'i-heroicons-tag',
    to: localePath('/tag')
  }
]);

useSeoMeta({
  title: () => t('LBL_TAGS'),
  description: () => description[(locale.value as 'bg' | 'en')],
  ogTitle: () => t('LBL_TAGS'),
  ogDescription: () => description[(locale.value as 'bg' | 'en')],
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/tag`,
});

useJsonLdBreadcrumbs(breadcrumbItems);
</script>

<template>
  <div class="grid grid-cols-1 gap-10">
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <h1 class="text-3xl font-medium px-5 m-0">
      <UIcon name="i-heroicons-tag" class="size-5" /> {{ t('LBL_TAGS') }}
    </h1>

    <div class="excerpt-card">
      <div class="absolute inline-flex items-center justify-center text-xs px-2 py-1 bg-white text-black dark:bg-black dark:text-white mr-0.5 rounded-full -top-2 -end-2">
        {{ t("LBL_TAGS") }}
      </div>

      <template v-for="(doc, index) in uniqueTags" :key="`${doc}-${index}`">
        <NuxtLink :to="localePath(`/tag/${doc}`)"
                  class="bg-white/50 text-black/75 hover:bg-white hover:text-black dark:bg-black/50 dark:text-white/75 dark:hover:bg-black dark:hover:text-white transition-colors ease-in-out duration-300 py-1 px-2 m-1 sm:mx-1 rounded-xl text-md inline-block">
          {{ t((`TAG_${doc}`).toUpperCase()) }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>