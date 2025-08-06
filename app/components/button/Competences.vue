<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div>
    <UTooltip :delay-duration="0"
              :text="$t('LBL_COMPETENCIES')">
      <NuxtLink :to="localePath('/competence')"
                :active-class="'nav-link-active'"
                role="button"
                class="flex items-center justify-center rounded-xl p-2 text-sm font-medium transition-colors duration-150 ease-in bg-gray-100 hover:bg-gray-300/75 dark:bg-gray-800/75 dark:hover:bg-gray-700">
        <UIcon name="i-heroicons-chart-bar-square" class="size-5" />
      </NuxtLink>
    </UTooltip>
  </div>
</template>