<script setup lang="ts">
const { locale } = useI18n();

const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';

const { data: body } = await useAsyncData(`search-sections-${collectionName}`, () => {
  return $fetch('/api/sections', {
    method: 'get', // или 'get', ако не изпращате тяло
    query: { collectionName: collectionName }
  });
});
</script>

<template>
  <div>
    <pre>{{ body }}</pre>
  </div>
</template>