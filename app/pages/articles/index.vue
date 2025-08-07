<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui';
                                                                  
const { locale, t } = useI18n();
const localePath = useLocalePath();

const pageSize = 10;
const currentLimit = ref(pageSize);

const { data: articlesData, pending } = await useLazyAsyncData(
  () => `articles-${locale.value}-${currentLimit.value}`,
  async () => {
    const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';

    return await queryCollection(`${collectionName}`)
      .limit(currentLimit.value)
      .skip(0)
      .order('date', 'DESC')
      .all();
  }, {
  server: true,
  watch: [locale, currentLimit]
});

const { data: totalCount } = await useLazyAsyncData(
  () => `articles-total-${locale.value}`,
  async () => {
    const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';
    return await queryCollection(`${collectionName}`).count();
  }, {
  server: true,
  watch: [locale]
});

const articles = computed(() => articlesData.value || []);
const total = computed(() => totalCount.value || 0);
const showLoadMore = computed(() => articles.value.length < total.value);

const loadMoreArticles = async () => {
  currentLimit.value += pageSize;
};

// Reset limit when locale changes
watch(locale, () => {
  currentLimit.value = pageSize;
});

const { data: seo } = await useLazyAsyncData('content-seo-articles', () => {
  return queryCollection('seo').where('stem', '=', 'seo/articles').first();
});

const title = computed(() => seo.value?.content.title[locale.value]);
const description = computed(() => seo.value?.content.description[locale.value]);
const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: t('LBL_HOME'),
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: title.value,
    to: localePath('/articles'),
    icon: 'i-heroicons-square-3-stack-3d'
  }
]);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/articles`,
});

// Add JSON-LD structured data for blog listing
const mappedArticles = computed(() => 
  articles.value.map(article => ({
    title: article.title,
    description: article.description,
    date: article.date,
    path: article.path
  }))
);

useJsonLdBlogListing(title, description, mappedArticles, locale);
useJsonLdBreadcrumbs(breadcrumbItems);
</script>

<template>
  <div class="grid grid-cols-1 gap-10">
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <h1 class="text-3xl font-medium px-5 m-0">
      {{ title }}
    </h1>

    <template v-if="pending">
      <div class="text-center text-gray-500">{{ t('LBL_LOADING') }}</div>
    </template>

    <template v-if="articles && Array.isArray(articles) && articles.length > 0">
      <template v-for="article in articles" :key="article.date">
        <ArticleExcerpt :doc="article" />
      </template>
    </template>

    <template v-if="showLoadMore">
      <ButtonLoadMore :current-count="articles.length"
                      :total-count="total"
                      @load-more="loadMoreArticles" />
    </template>
  </div>
</template>