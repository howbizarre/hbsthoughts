<script setup lang="ts">
const { locale, locales, t } = useI18n();
const availableLocales = computed(() => (locales.value).filter(i => i.code !== locale.value));

const switchLocalePath = useSwitchLocalePath();

watch(locale, () => useHead({ htmlAttrs: { lang: locale.value } }));
</script>

<template>
  <template v-for="locale in availableLocales" :key="locale.code">
    <UTooltip :delay-duration="0" :text="`${t('LBL_SWITCH_TO')} ${t(`LBL_LOCALE_${locale.code.toUpperCase()}`)}`">
      <UChip :text="locale.name?.toLowerCase()" color="neutral" size="myxl" class="font-thin text-xs">
        <UButton :to="switchLocalePath(locale.code)"
                 icon="i-heroicons-language"
                 size="md"
                 color="neutral"
                 variant="ghost" />
      </UChip>
    </UTooltip>
  </template>
</template>