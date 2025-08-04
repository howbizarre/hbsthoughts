<script setup lang="ts">
const { locale, t } = useI18n();
const localePath = useLocalePath();
const path = computed(() => localePath('/articles'));
const route = useRoute();
const { competence } = route.params;

const pageCompetence = t((`COMPETENCE_${(competence)}`).toUpperCase());
const pageTitle = `${t('LBL_COMPETENCE')} - ${pageCompetence}`;

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

    <div class="excerpt-card text-center">{{ t("LBL_COMPETENCIES") }}</div>
  </div>
</template>