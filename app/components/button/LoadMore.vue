<script lang="ts" setup>
interface Props {
  currentCount: number;
  totalCount: number;
  loadMoreText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadMoreText: 'LBL_LOAD_MORE_ARTICLES'
});

const emit = defineEmits<{
  loadMore: []
}>();

const { t } = useI18n();

const handleLoadMore = () => {
  emit('loadMore');
};
</script>

<template>
  <UButton @click="handleLoadMore"
           color="neutral"
           variant="link"
           class="flex justify-between items-center w-full p-5! rounded-2xl bg-gray-500/5 hover:bg-gray-500/25 cursor-pointer relative text-black dark:text-white">
    <span>{{ t(props.loadMoreText) }}</span>
    <span class="flex items-center gap-2">
      <small>{{ props.currentCount }} / {{ props.totalCount }}</small>
      <UIcon name="i-heroicons-arrow-down" class="size-4" />
    </span>
  </UButton>
</template>