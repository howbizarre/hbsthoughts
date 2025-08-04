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
  <article class="rounded-2xl mb-4 prose prose-lg dark:prose-invert">
    <ContentRenderer v-if="article" :value="article" />
  </article>
</template>
