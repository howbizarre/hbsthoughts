<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/help">Help</NuxtLink>
    <ButtonLangSwitcher />

    <main>
      <slot />
    </main>
  </div>
</template>