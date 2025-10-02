<script setup lang="ts">
const props = defineProps({
  tag: { type: String, required: true }
});
const { tag } = toRefs(props);

const { t, locale } = useI18n();
const path = computed(() => `/${locale.value}/tag/${tag.value}`);
</script>

<template>
  <NuxtLink :to="path"
            :title="`${t('LBL_LOOK_AT')} ${t('LBL_TAG')} ${t((`TAG_${tag}`).toUpperCase())}`"
            class="bg-gray-500 text-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors ease-in-out duration-200 py-1 px-2 m-1 sm:mx-1 rounded-xl text-xs inline-block">
    {{ t((`TAG_${tag}`).toUpperCase()) }}
  </NuxtLink>
</template>