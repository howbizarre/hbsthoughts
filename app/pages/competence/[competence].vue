<script setup lang="ts">
const { locale, t } = useI18n();
const route = useRoute();
const { competence } = route.params;

const { data: competenceData } = await useLazyAsyncData(
  () => `competence-${locale.value}-${competence}`,
  async () => {
    const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';

    return await queryCollection(`${collectionName}`)
      .where('competence', 'LIKE', `%${competence}%`)
      .order('date', 'DESC')
      .all();
  }, {
  server: true,
  watch: [locale]
});

const pageCompetence = t((`COMPETENCE_${(competence)}`).toUpperCase());
const pageTitle = `${pageCompetence} ${t('LBL_COMPETENCE')}`;

const description = {
  "bg": `Компетентността '${pageCompetence}' е показател, колко технически насочена е статията. От простичка, без технически детайли, до много професионална.`,
  "en": `Competence '${pageCompetence}' is an indicator of how technically oriented an article is. From simple, without technical details, to very professional.`
};

useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: description[(locale.value as 'bg' | 'en')] }]
});
</script>

<template>
  <div v-if="competence" class="grid grid-cols-1 gap-10">
    <h1 class="text-3xl font-medium text-center">
      {{ pageTitle }}
    </h1>

    <div v-for="value in competenceData" :key="value.date" class="rounded-2xl mb-4">
      <ArticleExcerpt :doc="value" />
    </div>
  </div>
</template>