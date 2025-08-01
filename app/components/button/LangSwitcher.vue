<script setup lang="ts">
const { locale, locales } = useI18n();
const availableLocales = computed(() => (locales.value).filter(i => i.code !== locale.value));

const switchLocalePath = useSwitchLocalePath();

watch(locale, () => useHead({ htmlAttrs: { lang: locale.value } }));
</script>

<template>
  <template v-for="locale in availableLocales" :key="locale.code">
    <NuxtLink :to="switchLocalePath(locale.code)">
      {{ locale.name }}
    </NuxtLink>
  </template>
</template>