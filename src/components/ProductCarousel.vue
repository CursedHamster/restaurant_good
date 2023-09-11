<script setup>
import { computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar, A11y, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import ProductCard from "./ProductCard.vue";
import { useProductsStore } from "./stores/useProductsStore";
import typesData from "../assets/types";

const props = defineProps({
  type: {
    type: Object,
    validator(value) {
      return typesData.find((val) => val === value) !== undefined;
    },
    default: typesData[0],
  },
});
const productsStore = useProductsStore();

const modules = [Navigation, Scrollbar, A11y, FreeMode];

const filteredProducts = computed(() =>
  productsStore?.products?.filter(
    (product) => product?.typeId === props?.type?.id && product?.extraId === 1
  )
);
</script>
<template>
  <Swiper
    :modules="modules"
    :slides-per-view="'auto'"
    :center-slides="true"
    :freeMode="true"
    focusable-elements="button"
    :rewind="true"
    navigation
    :scrollbar="{ draggable: true }"
    class="custom-global-swiper"
  >
    <SwiperSlide v-for="product in filteredProducts">
      <ProductCard :product="product" />
    </SwiperSlide>
  </Swiper>
</template>
<style scoped></style>
