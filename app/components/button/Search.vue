<script setup lang="ts">
import Fuse from 'fuse.js';

const { locale, t } = useI18n();

const query = ref('');
const collectionName = computed(() => `${locale.value}_articles`);

const { data: sections } = await useAsyncData(`search-sections-${collectionName.value}`, () => {
  return $fetch('/api/sections', {
    method: 'get',
    query: { collectionName: collectionName.value }
  });
});

const fuse = new Fuse(sections.value || [], {
  keys: ['title', 'description']
});
const result = computed(() => fuse.search(toValue(query)).slice(0, 10));

const normalizeUrl = (url: string) => url.split('#')[0];
</script>

<template>
  <div>
    <ClientOnly>
      <UModal title="Search" description="Search for articles by title or description.">
        <UTooltip :delay-duration="0"
                  :text="t('LBL_SEARCH')">
          <UButton icon="i-heroicons-magnifying-glass"
                   color="neutral"
                   variant="ghost"
                   size="md"
                   class="flex items-center justify-center rounded-xl p-2 text-sm font-medium transition-colors duration-150 ease-in bg-gray-100 hover:bg-gray-300/75 dark:bg-gray-800/75 dark:hover:bg-gray-700 cursor-pointer" />
        </UTooltip>

        <template #content>
          <UCard>
            <UInput v-model="query" :placeholder="`${t('LBL_SEARCH')}...`" class="w-full" />


            <div v-for="link of result" :key="link.item.id" class="mt-4">
              <a :href="normalizeUrl(link.item.id)" :title="link.item.title" class="w-full" target="_self">
                <strong class="block w-full">{{ link.item.title }}</strong>
                <small class="block w-full">{{ link.item.content?.slice(0, 100) }}...</small>
              </a>
            </div>
          </UCard>
        </template>
      </UModal>
    </ClientOnly>
  </div>
</template>