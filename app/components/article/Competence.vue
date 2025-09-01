<script setup lang="ts">
const props = defineProps({
  competence: { type: String, required: true },
  active: Boolean
});
const { competence, active } = toRefs(props);

const { t, locale } = useI18n();
const path = computed(() => `/${locale.value}/competence/${competence.value}`);
</script>

<template>
  <NuxtLink :to="path"
            :title="`${t('LBL_LOOK_AT')} ${t('LBL_COMPETENCE')} ${t((`COMPETENCE_${competence}`).toUpperCase())}`"
            class="bg-white/50 text-black hover:bg-white dark:bg-black dark:hover:bg-white/20 dark:text-white border border-white dark:border-black/50 transition-colors ease-in-out duration-200 py-1 px-2 m-1 sm:mx-1 rounded-xl text-xs inline-block">
    {{ t((`COMPETENCE_${competence}`).toUpperCase()) }}
  </NuxtLink>
</template>