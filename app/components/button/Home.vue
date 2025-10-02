<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <div>
    <UTooltip :delay-duration="0"
              :text="$t('LBL_HOME')">
      <NuxtLink :to="localePath('/')"
                :active-class="'nav-link-active'"
                :title="`${t('LBL_GO_TO')} ${t('LBL_HOME')}`"
                class="flex items-center justify-center rounded-xl p-2 text-sm font-medium transition-colors duration-150 ease-in bg-gray-50/25 hover:bg-gray-50/75 dark:bg-gray-950/25 dark:hover:bg-gray-950/75">
        <UIcon name="i-heroicons-home" class="size-5" />
      </NuxtLink>
    </UTooltip>
  </div>
</template>