<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink :to="localePath('/help')"
            :active-class="'nav-link-active'"
            role="button"
            class="flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in bg-gray-100 hover:bg-gray-300/75 dark:bg-gray-800/75 dark:hover:bg-gray-700">
    {{ t('LBL_HELP') }}
  </NuxtLink>
</template>