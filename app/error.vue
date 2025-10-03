<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({ error: Object as () => NuxtError });

const statusCode = computed(() => props.error?.statusCode || 404);
const { locale } = useI18n();
const l = useLocalePath();

const title = {
  "bg": `${statusCode.value} - ${props.error?.message}` || "Възникна грешка",
  "en": `${statusCode.value} - ${props.error?.message}` || "An error occurred"
};

useSeoMeta({
  title: () => title[locale.value],
  description: () => title[locale.value],
  ogTitle: () => title[locale.value],
  ogDescription: () => title[locale.value],
  ogImage: '/images/logo.svg',
});
</script>

<template>
  <div class="min-h-screen flex-1 flex flex-col">
    <main class="flex-1 justify-center items-center flex flex-col">
      <div class="mb-5 relative">
        <img src="/images/logo.svg" class="rounded-full shadow-2xl p-5 mb-5 w-full h-full block" />
      </div>

      <p class="text-xl text-center mb-5">{{ error?.message }}</p>

      <NuxtLink :to="l('/')"
                class="flex items-center justify-center gap-2 px-5 py-2 border rounded-full border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:bg-gray-100/50 hover:dark:bg-gray-900/50 hover:border-white hover:dark:border-black hover:shadow-md shadow-gray-500/50 transition-all duration-300">
        <UIcon name="i-heroicons-cursor-arrow-rays" class="size-5" />
        <UIcon name="i-heroicons-arrow-uturn-left" class="size-5" />
        <UIcon name="i-heroicons-home" class="size-5" />
      </NuxtLink>
    </main>
  </div>
</template>