<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../stores/useProductsStore";
import ProductGallery from "../ProductGallery.vue";
import ProductCard from "../ProductCard.vue";
import GeneralButton from "../GeneralButton.vue";
const route = useRoute();
const productsStore = useProductsStore();
const foundProducts = computed(() =>
  productsStore?.findProducts(route?.query?.s?.toLocaleLowerCase())
);
</script>
<template>
  <main
    role="main"
    class="custom-global-py custom-global-px flex flex-col items-center"
  >
    <div
      class="w-full flex flex-col gap-8 items-center my-8 sm:flex-row sm:justify-between 2xl:gap-20 2xl:mb-20"
    >
      <h1 class="text-4xl text-center sm:text-start 2xl:text-6xl">
        Результати пошуку
      </h1>
      <GeneralButton
        outline
        big
        @click="$router.go(-1)"
        class="flex gap-2 items-center justify-center"
        ><i class="fa-solid fa-chevron-left text-xs"></i>Повернутись
        назад</GeneralButton
      >
    </div>
    <ProductGallery
      v-if="foundProducts && foundProducts.length && foundProducts.length > 0"
      :products="foundProducts"
    >
      <ProductCard v-for="product in foundProducts" :product="product" />
    </ProductGallery>
    <p v-else class="custom-global-text-light py-8 text-xl">
      Нічого не знайдено
    </p>
  </main>
</template>
<style scoped></style>
