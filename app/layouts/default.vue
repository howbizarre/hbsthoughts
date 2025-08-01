<template>
    <UContainer>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/help">Help</NuxtLink>
    <ButtonColorMode />
    <ButtonLangSwitcher />

      <main class="flex-1">
        <slot />
      </main>
  </UContainer>
</template>