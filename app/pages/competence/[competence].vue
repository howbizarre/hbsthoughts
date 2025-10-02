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

const articles = computed(() => competenceData.value || []);
const pageCompetence = t((`COMPETENCE_${(competence)}`).toUpperCase());

const description = {
  "bg": `Компетентността '${pageCompetence}' е показател, колко технически насочена е статията. От простичка, без технически детайли, до много професионална.`,
  "en": `Competence '${pageCompetence}' is an indicator of how technically oriented an article is. From simple, without technical details, to very professional.`
};

const pageTitle = computed(() => `${pageCompetence} ${t('LBL_COMPETENCE')}`);
const pageDescription = computed(() => description[(locale.value as 'bg' | 'en')]);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: t('LBL_HOME'),
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_COMPETENCIES'),
    to: localePath('/competence'),
    icon: 'i-heroicons-chart-bar-square'
  },
  {
    label: pageTitle.value,
    to: localePath(`/competence/${competence}`),
    icon: 'i-heroicons-academic-cap'
  }
]);

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/competence/${competence}`,
});

// Add JSON-LD structured data for blog listing
const mappedArticles = computed(() =>
  articles.value.map(article => ({
    title: article.title,
    description: article.description,
    date: article.date,
    path: article.path
  }))
);

useJsonLdBlogListing(pageTitle, pageDescription, mappedArticles, locale);

const breadcrumbData = computed(() =>
  breadcrumbItems.value.map(item => ({
    label: item.label,
    to: item.to,
    icon: typeof item.icon === 'string' ? item.icon : undefined
  }))
);

useJsonLdBreadcrumbs(breadcrumbData);
</script>

<template>
  <div v-if="competence" class="grid grid-cols-1 gap-10">
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <h1 class="text-3xl font-medium px-5 m-0">
      <UIcon name="i-heroicons-academic-cap" class="size-5" /> {{ pageTitle }}
    </h1>

    <div v-for="value in competenceData" :key="value.date" class="rounded-2xl mb-4">
      <ArticleExcerpt :doc="value" />
    </div>
  </div>
</template>