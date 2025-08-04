<script setup lang="ts">
const { locale, locales } = useI18n();
const availableLocales = computed(() => (locales.value).filter(i => i.code !== locale.value));

const switchLocalePath = useSwitchLocalePath();

watch(locale, () => useHead({ htmlAttrs: { lang: locale.value } }));
</script>

<template>
  <template v-for="locale in availableLocales" :key="locale.code">
    <UButton :to="switchLocalePath(locale.code)"
             icon="i-heroicons-language"
             size="sm"
             color="neutral"
             variant="ghost">
      {{ locale.name }}
    </UButton>
  </template>
</template>