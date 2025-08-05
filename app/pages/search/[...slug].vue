<script setup lang="ts">
import Fuse from 'fuse.js';

const { locale } = useI18n();

const query = ref('');
const collectionName = `articles_${locale.value}` as 'articles_bg' | 'articles_en';

const { data: body } = await useAsyncData(`search-sections-${collectionName}`, () => {
  return $fetch('/api/sections', {
    method: 'get', // или 'get', ако не изпращате тяло
    query: { collectionName: collectionName }
  });
});

const fuse = new Fuse(body.value || [], {
  keys: ['title', 'description']
});
const result = computed(() => fuse.search(toValue(query)).slice(0, 10));
</script>

<template>
  <div>
    <UModal title="Search" description="Search for articles by title or description.">
      <UButton label="Open" color="neutral" variant="subtle" />
      <template #content>
        <UCard>

          <UInput v-model="query" placeholder="Search..." class="w-full" />
          <ul>
            <li v-for="link of result" :key="link.item.id" class="mt-2">
              <UButton variant="ghost" class="w-full" :to="link.item.id">
                {{ link.item.title }}
                <span class="text-gray-500 text-xs">
                  {{ link.item.content?.slice(0, 100) }}...
                </span>
              </UButton>
            </li>
          </ul>
        </UCard>
      </template>
    </UModal>
  </div>
</template>