<script setup lang="ts">
const header = ref<HTMLElement | null>(null);
const sticky = ref(104);

const stickIt = () => {
  if (header.value) {
    if (window.scrollY >= sticky.value) {
      header.value.classList.add('sticky-active');
    } else {
      header.value.classList.remove('sticky-active')
    }
  }
};

onBeforeMount(() => window.addEventListener('scroll', stickIt));
onMounted(() => sticky.value = header.value?.offsetTop || 104);
onBeforeUnmount(() => window.removeEventListener('scroll', stickIt));
</script>

<template>
  <header ref="header" class="bg-img-grad max-w-3xl w-full mx-auto flex items-center transition-all duration-300 justify-between bg-[#f9f4ff] dark:bg-[#02013e] rounded-2xl shadow-lg p-3 mb-10 sticky top-0 z-50">
    <div class="flex items-center gap-2">
      <ButtonHome />
      <ButtonHelp />
      <ButtonSearch />
    </div>

    <div class="flex justify-end gap-0">
      <ButtonLangSwitcher />
      <ButtonColorMode />
    </div>
  </header>
</template>

<style scoped>
.sticky-active {
  @apply rounded-tl-none rounded-tr-none !max-w-[50rem];
}

.dark .bg-img-grad {
  @apply bg-[url('/images/gulf.svg')] bg-cover bg-center;
}

.light .bg-img-grad {
  @apply bg-[url('/images/micron.svg')] bg-cover bg-center;
}
</style>