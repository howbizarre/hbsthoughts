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
    <ContentRenderer v-if="article" :value="article" class="prose dark:prose-invert max-w-full px-4 lg:px-2" />
  </article>
</template>
