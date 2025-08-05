<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <UTooltip :delay-duration="0"
            :text="t('LBL_HELP')">
    <NuxtLink :to="localePath('/help')"
              :active-class="'nav-link-active'"
              role="button"
              class="flex items-center justify-center gap-1 rounded-xl p-2 text-sm font-medium transition-colors duration-150 ease-in bg-gray-100 hover:bg-gray-300/75 dark:bg-gray-800/75 dark:hover:bg-gray-700">
      <UIcon name="i-heroicons-information-circle" class="size-5" /> <span>{{ t('LBL_HELP') }}</span>
    </NuxtLink>
  </UTooltip>
</template>