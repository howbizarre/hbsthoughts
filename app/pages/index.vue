<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">{{ t('THE_QUESTION') }}</h1>
    <ButtonColorMode />
    <ButtonLangSwitcher />
  </div>
</template>