<template>
  <UContainer>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/help">Help</NuxtLink>
    <ButtonColorMode />
    <ButtonLangSwitcher />
    <main>
      <slot />
    </main>
  </UContainer>
</template>