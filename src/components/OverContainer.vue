<script setup>
import GeneralButton from "./GeneralButton.vue";
const props = defineProps({ showPage: Boolean, title: String });
const emit = defineEmits(["closeContainer"]);
</script>
<template>
  <Teleport to="body">
    <Transition name="over-page">
      <div
        v-if="showPage"
        class="fixed top-0 left-0 right-0 w-full h-full pb-6 z-[2000] bg-zinc-950 overflow-y-auto"
      >
        <div class="custom-global-px w-full flex flex-col-reverse gap-8 py-8 justify-between items-center sm:flex-row 2xl:py-20">
          <h1 class="text-4xl text-center 2xl:text-6xl">
          {{ title }}
        </h1>
          <GeneralButton close @click="$emit('closeContainer')">
          </GeneralButton>
        </div>
        
        <div class="custom-global-px flex flex-col items-center">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
.over-page-enter-active,
.over-page-leave-active {
  transition: all 0.3s ease-in-out;
}
.over-page-enter-from {
  transform: translateY(-100%);
}
.over-page-leave-to {
  transform: translateY(-100%);
}
</style>
