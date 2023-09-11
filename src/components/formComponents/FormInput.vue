<script setup>
const props = defineProps({
  name: String,
  label: String,
  changed: Boolean,
});
</script>
<template>
  <div class="relative w-full h-fit flex justify-center items-center">
    <slot
      class="peer w-full py-3 px-6 rounded-full bg-zinc-950 border-2 border-zinc-700 focus:outline-none focus:border-red-500 autofill:bg-red-400 autofill:bg-opacity-0"
    ></slot>
    <label
      :for="name"
      class="custom-global-text-light absolute top-0 left-0 bottom-0 h-fit my-auto ml-4 bg-zinc-950 px-2 transition-all duration-200 ease-in-out peer-focus:-translate-y-full"
      :class="{ '-translate-y-full': changed }"
      >{{ label }}</label
    >
  </div>
</template>
<style scoped></style>
