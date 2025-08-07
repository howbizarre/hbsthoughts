<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { locale, t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { competence } = route.params;

const { data: competenceData } = await useLazyAsyncData(
  () => `competence-${locale.value}-${competence}`,
  async () => {
    const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';

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

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_COMPETENCIES'),
    to: localePath('/competence'),
    icon: 'i-heroicons-chart-bar-square'
  },
  {
    label: pageTitle
  }
]);

useSeoMeta({
  title: () => pageTitle,
  description: () => description[(locale.value as 'bg' | 'en')],
  ogTitle: () => pageTitle,
  ogDescription: () => description[(locale.value as 'bg' | 'en')],
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/competence/${competence}`,
});

useJsonLdBreadcrumbs(breadcrumbItems.value);
</script>

<template>
  <div v-if="competence" class="grid grid-cols-1 gap-10">
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <h1 class="text-3xl font-medium px-5 m-0">
      {{ pageTitle }}
    </h1>

    <div v-for="value in competenceData" :key="value.date" class="rounded-2xl mb-4">
      <ArticleExcerpt :doc="value" />
    </div>
  </div>
</template>