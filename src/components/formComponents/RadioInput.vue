<script setup>
import { computed } from "vue";
const props = defineProps({
  name: [String, Number],
  radioValue: [String, Number],
  label: String,
  modelValue: [String, Number],
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
  <div class="flex gap-3 items-center px-4 py-2">
    <div class="relative w-fit h-fit flex justify-center items-center">
      <input
        type="radio"
        :id="name"
        :name="name"
        :value="radioValue"
        v-model="value"
        class="before:content[''] cursor-pointer peer h-6 w-6 appearance-none rounded-full border-2 border-red-500 ring-red-500 ring-offset-0 ring-opacity-50 transition-all ease-in-out hover:ring-4 active:ring-8 checked:bg-red-500"
      />
      <i
        class="fa-solid fa-check absolute top-0 left-0 right-0 bottom-0 w-full h-full hidden justify-center items-center text-sm pointer-events-none peer-checked:flex"
      ></i>
    </div>
    <label :for="name" class="text-lg cursor-pointer">{{ label }}</label>
  </div>
</template>
<style scoped></style>
