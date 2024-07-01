<script setup>
const props = defineProps(["index"])
</script>
<template>
  <!-- <div
    class="w-full px-6 py-4 rounded-r-xl border-l-8 border-red-800 bg-zinc-900 font-bold text-xl sm:text-2xl"
  >
    <slot></slot>
  </div> -->
  <div
    class="w-full flex justify-center items-center gap-2 text-2xl sm:text-3xl md:text-4xl md:gap-4 md:justify-start"
  >
    <div
      class="text-red-500 font-bold text-3xl sm:text-4xl md:text-5xl"
    >{{ index }}
    </div>
    <slot></slot>
  </div>
</template>
<style scoped></style>
