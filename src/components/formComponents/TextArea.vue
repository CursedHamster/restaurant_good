<script setup>
import { computed } from "vue";
const props = defineProps({
  name: String,
  label: String,
  changed: Boolean,
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get() {
    return props?.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div class="relative w-full h-fit flex justify-center items-center">
    <textarea
      id="comment"
      name="comment"
      v-model="value"
      class="resize-none peer w-full py-3 px-6 rounded-3xl bg-transparent border-2 border-zinc-900 focus:outline-none focus:border-red-500 autofill:bg-red-400 autofill:bg-opacity-0"
    ></textarea>
    <label
      :for="name"
      class="custom-global-text-light absolute top-0 left-0 bottom-0 h-fit mt-3 ml-4 bg-zinc-950 px-2 transition-all duration-200 ease-in-out peer-focus:-translate-y-full"
      :class="{ '-translate-y-full': changed }"
      >{{ label }}</label
    >
  </div>
</template>
<style scoped></style>
