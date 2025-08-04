<script setup lang="ts">
const { locale, t } = useI18n();

const route = useRoute();
const { tag } = route.params;

const { data: tagData } = await useLazyAsyncData(
  () => `tag-${locale.value}-${tag}`,
  async () => {
    const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';

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

useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: description[(locale.value as 'bg' | 'en')] }]
});
</script>

<template>
  <div v-if="tag" class="grid grid-cols-1 gap-10">
    <h1 class="text-3xl font-medium text-center">
      {{ pageTitle }}
    </h1>

    <div v-for="value in tagData" :key="value.date" class="rounded-2xl mb-4">
      <ArticleExcerpt :doc="value" />
    </div>
  </div>
</template>