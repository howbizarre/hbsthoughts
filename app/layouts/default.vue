<script setup lang="ts">
const i18nHead = useLocaleHead({
  seo: true,
  lang: true,
});

useHead({
  titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} | HB's Thoughts` : "How Bizarre's Thoughts",
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
});
</script>

<template>
  <UContainer class="pb-3 min-h-screen flex flex-col">
    <LayoutLogos />
    <LayoutHeader />

    <main class="max-w-3xl w-full mx-auto content flex-1">
      <slot />
    </main>

    <LayoutFooter />
  </UContainer>
</template>