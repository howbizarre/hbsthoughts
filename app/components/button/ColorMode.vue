<script setup lang="ts">
const { t } = useI18n();
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  }
});
</script>

<template>
  <div v-if="!colorMode?.forced">
    <ClientOnly>
      <UTooltip :delay-duration="0" :text="`${t(isDark ? 'TXT_LIGHT_SIDE_SWITCH' : 'TXT_DARK_SIDE_SWITCH')}`">
        <UButton :icon=" isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                 @click=" isDark=!isDark"
                color="neutral"
                variant="ghost"
                size="md"
                class="cursor-pointer" />
      </UTooltip>
      <template #fallback>
        <div class="size-8" />
      </template>
    </ClientOnly>
  </div>
</template>