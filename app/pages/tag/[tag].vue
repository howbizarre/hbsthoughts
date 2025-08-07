<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale, t } = useI18n();
const localePath = useLocalePath();

const route = useRoute();
const { tag } = route.params;

const { data: tagData } = await useLazyAsyncData(
  () => `tag-${locale.value}-${tag}`,
  async () => {
    const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';

    const allResults = await queryCollection(`${collectionName}`)
      .where('tags', 'LIKE', `%${tag}%`)
      .order('date', 'DESC')
      .all();
      
    return allResults.filter(item => Array.isArray(item.tags) && item.tags.includes(`${tag}`));
  }, {
  server: true,
  watch: [locale]
});

const pageTag = t((`TAG_${(tag)}`).toUpperCase());
const pageTitle = `${pageTag} ${t('LBL_TAG')}`;
const description = {
  "bg": `Тагът '${pageTag}' е ключова дума за лесно филтриране на статиите по тематики.`,
  "en": `The tag '${pageTag}' is a keyword for easy filtering of articles by topics.`
};

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: t('LBL_HOME'),
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_TAGS'),
    to: localePath('/tag'),
    icon: 'i-heroicons-tag'
  },
  {
    label: pageTitle,
    to: localePath(`/tag/${tag}`),
  }
]);

useSeoMeta({
  title: () => pageTitle,
  description: () => description[(locale.value as 'bg' | 'en')],
  ogTitle: () => pageTitle,
  ogDescription: () => description[(locale.value as 'bg' | 'en')],
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/tag/${tag}`,
});

// Add JSON-LD structured data for breadcrumbs
useJsonLdBreadcrumbs(breadcrumbItems);
</script>

<template>
  <div v-if="tag" class="grid grid-cols-1 gap-10">
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <h1 class="text-3xl font-medium px-5 m-0">
      {{ pageTitle }}
    </h1>

    <div v-for="value in tagData" :key="value.date" class="rounded-2xl mb-4">
      <ArticleExcerpt :doc="value" />
    </div>
  </div>
</template>