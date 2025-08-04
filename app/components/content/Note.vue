<template>
  <div class="p-3 text-sm leading-relaxed bg-blue-200/50 border border-blue-500/25 text-black dark:bg-blue-800/50 dark:text-white rounded-lg relative">
    <UIcon name="i-heroicons-information-circle" class="size-6 inline-block text-blue-500 absolute bottom-2 right-2" />
    <slot mdc-unwrap="p" />
  </div>
</template>