<script setup>
import { useLoadingStore } from "./components/stores/useLoadingStore";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Loading from "./components/Loading.vue";
import Favorites from "./components/pages/Favorites.vue";
import Search from "./components/pages/Search.vue";
import Cart from "./components/pages/Cart.vue";
import Reserve from "./components/pages/Reserve.vue";
import Order from "./components/pages/Order.vue";
const loadingStore = useLoadingStore();
</script>

<template>
  <TheHeader />
  <div class="min-h-screen flex flex-col justify-between">
    <Loading v-if="loadingStore?.loading" />
    <RouterView v-else></RouterView>
    <TheFooter />
  </div>
  <Favorites />
  <Search />
  <Cart />
  <Reserve />
  <Order />
</template>

<style scoped></style>
