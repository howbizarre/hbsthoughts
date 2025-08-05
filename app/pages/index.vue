<script lang="ts" setup>
const { t, locale } = useI18n();

const pageSize = 3;
const currentLimit = ref(pageSize);

const { data: articlesData, pending } = await useLazyAsyncData(
  () => `articles-${locale.value}-${currentLimit.value}`,
  async () => {
    const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';

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
    const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';
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
  ogImage: () => '/images/logo.svg',
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}`,
});
</script>

<template>
  <div class="grid grid-cols-1 gap-10">
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