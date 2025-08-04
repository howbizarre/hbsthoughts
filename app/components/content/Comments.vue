<script setup lang="ts">
defineProps({
  discussions: {
    discussions: String,
    default: "https://github.com/howbizarre/thoughts/discussions/4"
  }
});

const { locale } = useI18n();

const description = {
  "bg": [
    "Ако имате мнение или въпроси за статията, не се колебайте да ги споделите.",
    "Влезте в отворената дискусия в GitHub."
  ],
  "en": [
    "If you have an opinion or questions about the article, don't hesitate to share them.",
    "Join the open discussion on GitHub."
  ]
};
</script>

<template>
  <div class="p-3 text-sm leading-relaxed bg-orange-200/50 border border-orange-500/25 text-black dark:bg-orange-800/50 dark:text-white rounded-lg relative">
    <UIcon name="i-heroicons-chat-bubble-left-right" class="size-6 rounded-full inline-block text-orange-500 absolute bottom-2 right-2" />

    <p class="!m-0 !leading-normal">{{ description[(locale as 'bg' | 'en')][0] }}</p>

    <p class="!leading-normal !mt-3">
      <a :href="discussions" target="_blank" rel="noopener" class="inline-flex items-center !border-none justify-start transition-colors duration-300 hover:!text-orange-500">
        <UIcon name="i-heroicons-arrow-top-right-on-square" class="size-4 mr-1 rounded-full inline-block text-black dark:text-white" />
        {{ description[(locale as 'bg' | 'en')][1] }}
      </a>
    </p>
  </div>
</template>