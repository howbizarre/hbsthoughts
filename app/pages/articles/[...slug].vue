<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const slug = ref(route.params.slug);

const { data: article } = await useLazyAsyncData(`${route.path}-${slug.value}`, async () => {
  const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';
  return await queryCollection(`${collectionName}`).path(`/${locale.value}/articles/${slug.value}`).first()
}, { server: true });

const { data: surroundingArticles } = await useLazyAsyncData(
  () => `surround-article-${route.path}-${locale.value}`, // реактивен ключ
  async () => {
    const collectionName = `${locale.value}_articles` as 'bg_articles' | 'en_articles';
    return await queryCollectionItemSurroundings(collectionName, `/articles/${locale.value}/${slug.value}`).order('date', 'DESC')
  }, { server: true }
);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    icon: 'i-heroicons-home',
    to: localePath('/')
  },
  {
    label: t('LBL_ARTICLES'),
    to: localePath('/articles'),
    icon: 'i-heroicons-square-3-stack-3d'
  },
  {
    label: article.value?.title
  }
]);

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.description,
  ogUrl: () => `https://thoughts.bizarre.how/${locale.value}/articles/${slug.value}`,
});

function formatPath(path: string): string {
  const pathArray = path.split('/');
  return `/${pathArray[2]}/${pathArray[1]}/${pathArray[3]}`;
}
</script>

<template>
  <article class="rounded-2xl mb-4">
    <LayoutBreadcrumb :items="breadcrumbItems" />

    <header class="text-left my-10 px-5">
      <p v-if="article?.date" class="text-gray-500 text-sm -mb-7 block">{{ (new Date(article.date)).toLocaleDateString(locale) }}</p>
      <h1 class="text-4xl font-medium">{{ article?.title }}</h1>
    </header>

    <ContentRenderer v-if="article" :value="article" class="prose dark:prose-invert max-w-full px-5" />

    <div class="px-5">
      <hr class="h-line" />

      <div class="grid gap-8 sm:grid-cols-2">
        <template v-if="surroundingArticles?.[1]">
          <NuxtLink :to="formatPath(surroundingArticles[1].path)"
                    class="block px-6 py-8 border rounded-lg border-gray-50! dark:border-gray-950! hover:bg-gray-50/50 dark:hover:bg-gray-950/50 group transition-colors duration-300">
            <div class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-700 mb-4">
              <UIcon name="i-heroicons-arrow-left" class="size-5 text-gray-900 dark:text-white group-hover:text-green-500 transition-colors duration-300" />
            </div>

            <p class="font-medium text-gray-900 dark:text-white text-lg font-serif mb-1 line-clamp-1 md:line-clamp-none">
              {{ surroundingArticles[1].title }}
            </p>
          </NuxtLink>
        </template>

        <div v-else class="hidden sm:block px-6 py-8">&nbsp;</div>

        <template v-if="surroundingArticles?.[0]">
          <NuxtLink :to="formatPath(surroundingArticles[0].path)" class="block px-6 py-8 border rounded-lg border-gray-50! dark:border-gray-950! hover:bg-gray-50/50 dark:hover:bg-gray-950/50 group transition-colors duration-300 text-right">
            <div class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-700 mb-4">
              <UIcon name="i-heroicons-arrow-right" class="size-5 text-gray-900 dark:text-white group-hover:text-green-500 transition-colors duration-300" />
            </div>

            <p class="font-medium text-gray-900 dark:text-white text-lg font-serif mb-1 line-clamp-1 md:line-clamp-none">
              {{ surroundingArticles[0].title }}
            </p>
          </NuxtLink>
        </template>
      </div>

      <hr class="h-line" />
    </div>
  </article>
</template>
