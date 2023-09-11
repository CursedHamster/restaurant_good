<script setup>
import ProductCard from "./ProductCard.vue";
const props = defineProps({
  products: Array,
});
</script>
<template>
  <div
    class="py-4 w-fit max-w-full flex flex-col gap-x-8 gap-y-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <ProductCard v-for="product in products" :product="product" class="sm:w-full 2xl:w-full" />
  </div>
</template>
<style scoped></style>
