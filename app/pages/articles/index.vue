<script lang="ts" setup>
const { t, locale } = useI18n();

const { data: articles } = await useLazyAsyncData(`articles-${locale.value}`, async () => {
  const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';

  return await queryCollection(`${collectionName}`)
    .limit(10)
    .skip(0)
    .order('date', 'DESC')
    .all();
}, { server: true });

const { data: seo } = await useLazyAsyncData('content-seo-articles', () => {
  return queryCollection('seo').where('stem', '=', 'seo/articles').first();
});

const title = computed(() => t('THE_QUESTION'));
const description = computed(() => seo.value?.content.description[locale.value]);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/articles`,
});
</script>

<template>
  <div class="grid grid-cols-1 gap-10">
    <template v-if="articles && Array.isArray(articles) && articles.length > 0">
      <template v-for="article in articles" :key="article.date">
        <ArticleExcerpt :doc="article" />
      </template>
    </template>
  </div>
</template>