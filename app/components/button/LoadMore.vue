<script lang="ts" setup>
interface Props {
  currentCount: number;
  totalCount: number;
  loadMoreText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loadMoreText: 'LBL_LOAD_MORE'
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
  <div>
    <UButton @click="handleLoadMore"
             color="neutral"
             variant="link"
             class="flex justify-between items-center w-full p-5! rounded-2xl cursor-pointer relative backdrop-blur-sm bg-cyan-500/5 hover:bg-cyan-600/10 dark:hover:bg-cyan-300/10 text-black/60 dark:text-white/60">
      <span>{{ t(props.loadMoreText) }}</span>
      <small>{{ props.currentCount }} / {{ props.totalCount }}</small>
      <UIcon name="i-heroicons-bars-arrow-down" class="size-5" />
    </UButton>
  </div>
</template>