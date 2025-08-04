<script setup lang="ts">
const props = defineProps({
  doc: { type: Object as PropType<any>, required: true }
});
const doc = toRef(props, 'doc');

const { locale, t } = useI18n();
const path = computed(() => `/${locale.value}/articles/${doc.value.slug}`);
</script>

<template>
  <div class="excerpt-card">
    <div class="text-sm text-gray-500 -mb-1 block">
      {{ (new Date(doc.date)).toLocaleDateString(locale) }}
    </div>

    <h2 class="text-3xl font-normal mt-1">
      <NuxtLink :to="path">
        {{ doc.title }}
        <span class="sr-only">{{ t('TXT_LINK_ARTICLE') }}</span>
      </NuxtLink>
    </h2>

    <div v-if="doc?.excerpt" class="pr-4 my-3">
      <ContentRenderer :value="doc.excerpt" />
    </div>

    <hr class="h-line" />

    <div class="grid grid-col-1 sm:flex sm:justify-start sm:items-center gap-2 sm:gap-5">
      <div v-if="doc.competence" class="text-sm">
        {{ t("LBL_COMPETENCE") }}:
        <ArticleCompetence :competence="doc.competence" :active="false" />
      </div>

      <div v-if="doc.tags" class="text-sm">
        {{ t("LBL_TAGS") }}:
        <template v-for="tag in doc.tags">
          <ArticleTag :tag="tag" :active="false" />
        </template>
      </div>
    </div>
  </div>
</template>