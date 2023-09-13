<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useProductsStore } from "../stores/useProductsStore";
import types from "../../assets/types";
import ProductCard from "../ProductCard.vue";
import GeneralButton from "../GeneralButton.vue";
const props = defineProps({
  productId: {
    type: [Number, String],
    validator(value) {
      return parseInt(value);
    },
  },
});
const productsStore = useProductsStore();
const product = ref(null);
const productType = computed(() =>
  types?.find((type) => type?.id === product?.value?.typeId)
);
onBeforeMount(() => {
  product.value = productsStore?.findProductById(parseInt(props?.productId));
});
watch(
  () => productsStore?.findProductById(parseInt(props?.productId)),
  (productById) => {
    console.log("meow", product.value);
    if (productById) {
      product.value = productById;
    }
  }
);
</script>
<template>
  <main role="main" class="custom-global-py">
    <div
      class="custom-global-px mb-10 mt-8 w-full flex flex-col gap-4 md:flex-row-reverse md:justify-between md:gap-8"
    >
      <div
        v-if="product"
        class="custom-global-text-light flex gap-2 items-center min-w-0 md:gap-4 md:text-xl"
      >
        <RouterLink to="/menu"> Меню </RouterLink>
        <i class="fa-solid fa-chevron-right text-xs"></i>
        <RouterLink :to="'/menu#' + productType?.name">
          {{ productType?.title }}
        </RouterLink>
        <i class="fa-solid fa-chevron-right text-xs"></i>
        <p class="text-white font-bold truncate">{{ product?.name }}</p>
      </div>
      <GeneralButton
        outline
        big
        @click="$router.go(-1)"
        class="flex gap-2 items-center justify-center md:min-w-fit"
        ><i class="fa-solid fa-chevron-left text-xs"></i>Повернутись
        назад</GeneralButton
      >
    </div>
    <div class="custom-global-px-md">
      <ProductCard :product="product" card-type="product" />
    </div>
  </main>
</template>
<style scoped></style>
