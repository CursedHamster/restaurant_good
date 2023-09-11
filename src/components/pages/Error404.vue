<script setup>
import GeneralButton from "../GeneralButton.vue";
</script>
<template>
  <section role="contentinfo" class="custom-global-px custom-global-py flex-1 h-full flex flex-col justify-center items-center gap-6 text-center">
    <h1 class="text-4xl 2xl:text-6xl">
      Помилка <b class="text-red-500">404</b>
    </h1>
    <p class="custom-global-text-light text-lg 2xl:text-xl">Сторінку, яку ви шукаєте, не знайдено</p>
    <GeneralButton class="mt-4">Повернутись на головну сторінку</GeneralButton>
  </section>
</template>
<style scoped></style>
