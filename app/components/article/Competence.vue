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
            :class="active ? 'bg-white text-black dark:bg-black dark:text-white' : 'bg-gray-500 !text-white'"
            :title="`${t('LBL_LOOK_AT')} ${t('LBL_COMPETENCE')} ${t((`COMPETENCE_${competence}`).toUpperCase())}`"
            class="py-1 px-2 m-1 sm:mx-1 rounded-xl text-xs inline-block">
    {{ t((`COMPETENCE_${competence}`).toUpperCase()) }}
  </NuxtLink>
</template>