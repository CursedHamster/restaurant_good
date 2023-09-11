<script setup>
import GeneralButton from "./GeneralButton.vue";
const props = defineProps({ title: String, iconClass: String });
const emit = defineEmits(["buttonAction"]);
</script>
<template>
  <div
    class="w-full max-w-2xl px-4 py-12 rounded-xl bg-zinc-900 flex flex-col items-center gap-8 text-center"
  >
    <i class="text-zinc-700 text-8xl" :class="iconClass"></i>
    <h1 class="mb-8 text-3xl 2xl:text-5xl">{{ title }}</h1>
    <GeneralButton big @click="emit('buttonAction')"
      >Продовжити покупки</GeneralButton
    >
  </div>
</template>
<style scoped></style>
