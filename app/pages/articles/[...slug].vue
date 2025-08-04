<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();
const slug = ref(route.params.slug);

const { data: article } = await useLazyAsyncData(route.path, () => {
  const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';
  return queryCollection(`${collectionName}`).path(`/articles/${locale.value}/${slug.value}`).first()
}, { server: true });
</script>

<template>
  <article class="rounded-2xl mb-4">
    <header class="text-left mb-10 px-5">
      <p v-if="article?.date" class="text-gray-500 text-sm -mb-7 block">{{ (new Date(article.date)).toLocaleDateString(locale) }}</p>
      <h1 class="text-4xl font-medium">{{ article?.title }}</h1>
    </header>

    <ContentRenderer v-if="article" :value="article" class="prose dark:prose-invert max-w-full px-5" />
  </article>
</template>
