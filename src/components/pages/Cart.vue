<script setup>
import { computed } from "vue";
import { useOverPagesStore } from "../stores/useOverPagesStore";
import { useCartStore } from "../stores/useCartStore";
import OverContainer from "../OverContainer.vue";
import ProductCard from "../ProductCard.vue";
import GeneralButton from "../GeneralButton.vue";
import NothingFound from "../NothingFound.vue";
const overPagesStore = useOverPagesStore();
const cartStore = useCartStore();
const cartProducts = computed(() => cartStore?.cartProducts);
const totalPrice = computed(() => cartStore?.totalPrice);
const deliveryCost = computed(() => (cartStore?.totalPrice >= 1000 ? 0 : 50));
const orderCost = computed(() => totalPrice?.value + deliveryCost?.value);
</script>
<template>
  <OverContainer
    title="Кошик"
    :show-page="overPagesStore?.openCart"
    @close-container="overPagesStore?.changeOpenCart(false)"
  >
    <div
      v-if="cartProducts?.length > 0"
      class="flex flex-col items-center w-full gap-16 py-4 xl:flex-row xl:items-start"
    >
      <ul class="flex flex-col gap-10 w-full xl:basis-7/12">
        <li v-for="product in cartProducts">
          <ProductCard :product="product" card-type="cart" />
        </li>
      </ul>
      <div
        class="w-full px-4 py-8 rounded-xl bg-zinc-900 shadow-sm shadow-zinc-800 flex flex-col gap-6 sm:px-6 xl:sticky xl:top-8 xl:basis-5/12"
      >
        <div>
          <h2 class="text-3xl text-center md:text-start 2xl:text-5xl">
            Ваше замовлення
          </h2>
          <p class="custom-global-text-light mt-6">
            <i class="fa-solid fa-circle-info mr-1 text-red-500"></i>
            Безкоштовна доставка при замовленні від 1000 грн
          </p>
        </div>
        <div
          class="py-6 custom-global-text-light text-xl border-t-2 border-b-2 border-zinc-800"
        >
          <h4 class="flex flex-col gap-2 sm:flex-row">
            Сума замовлення:
            <span class="text-white font-bold">{{ totalPrice }} грн</span>
          </h4>
          <h4 class="mt-6 flex flex-col gap-2 sm:flex-row">
            Сума доставки:
            <span class="text-white font-bold">{{ deliveryCost }} грн</span>
          </h4>
        </div>
        <div class="flex flex-col gap-8">
          <h3
            class="text-xl font-bold text-white flex flex-col gap-2 sm:flex-row"
          >
            Загальна сума:
            <span class="text-2xl text-red-500">{{ orderCost }} грн</span>
          </h3>
          <GeneralButton big @click="overPagesStore?.changeOpenOrder(true)"
            >Замовити</GeneralButton
          >
        </div>
      </div>
    </div>
    <NothingFound
      v-else
      title="Кошик порожній"
      icon-class="fa-solid fa-basket-shopping"
      @button-action="overPagesStore?.changeOpenCart(false)"
    />
  </OverContainer>
</template>
<style scoped></style>
