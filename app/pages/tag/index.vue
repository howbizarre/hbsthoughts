<template>
  <div>
    <pre>{{ uniqueTags }}</pre>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';
const allArticles = await queryCollection(`${collectionName}`).select('tags').all();
const allTags = allArticles
  .flatMap(article => Array.isArray(article.tags) ? article.tags : [])
  .filter(Boolean);

const uniqueTags = [...new Set(allTags)];
</script>