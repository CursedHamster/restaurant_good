<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
onMounted(() => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
  tl.to(".custom-loading-dot", {
    opacity: 1,
    scale: 1,
    duration: 0.2,
    stagger: {
      each: 0.1,
    },
  });
});
</script>
<template>
  <div
    class="flex-1 w-full h-full bg-zinc-950 flex justify-center items-center"
  >
    <div class="flex justify-center items-center gap-2">
      <span
        v-for="i = 1 in 3"
        class="custom-loading-dot block w-4 h-4 bg-red-500 rounded-full opacity-0 scale-0"
      ></span>
    </div>
  </div>
</template>
<style scoped></style>
