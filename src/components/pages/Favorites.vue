<script setup>
import { computed } from "vue";
import { useProductsStore } from "../stores/useProductsStore";
import { useOverPagesStore } from "../stores/useOverPagesStore";
import OverContainer from "../OverContainer.vue";
import ProductGallery from "../ProductGallery.vue";
import ProductCard from "../ProductCard.vue";
import NothingFound from "../NothingFound.vue";
const overPagesStore = useOverPagesStore();
const productsStore = useProductsStore();
const favoriteProducts = computed(() =>
  productsStore?.products?.filter((product) => product?.isFavorite)
);
</script>
<template>
  <OverContainer
    title="Вибране"
    :show-page="overPagesStore?.openFavorites"
    @close-container="overPagesStore?.changeOpenFavorites(false)"
  >
    <ProductGallery v-if="favoriteProducts?.length > 0" :products="favoriteProducts">
      <ProductCard
        v-for="product in favoriteProducts"
        :product="product"
        card-type="favorite"
      />
    </ProductGallery>
    <NothingFound
      v-else
      title="Нічого не вибрано"
      icon-class="fa-solid fa-heart-circle-xmark"
      @button-action="overPagesStore?.changeOpenFavorites(false)"
    />
  </OverContainer>
</template>
<style scoped></style>
