<template>
  <div>
    <pre>{{ uniqueCompetence }}</pre>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';
const allArticlesRaw = await queryCollection(`${collectionName}`).select('competence').all();

const uniqueCompetence = [...new Set(
  allArticlesRaw
    .map(article => article.competence)
    .filter(Boolean)
)]


</script>