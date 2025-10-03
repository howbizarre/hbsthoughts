<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translate(0, 50px); /* надолу */
}

.slide-up-leave-to {
  opacity: 0;
  transform: translate(0, -50px); /* нагоре */
}
</style>