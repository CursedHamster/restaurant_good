<script setup>
import { ref, computed } from "vue";
import { useProductsStore } from "./stores/useProductsStore";
import { useOverPagesStore } from "./stores/useOverPagesStore";
import { useCartStore } from "./stores/useCartStore";
import extras from "../assets/extras";
import GeneralButton from "./GeneralButton.vue";
import RadioInput from "./formComponents/RadioInput.vue";
const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  cardType: {
    validator(value) {
      return ["product", "cart", "favorite", "default"].includes(value);
    },
    default: "default",
  },
});
const productsStore = useProductsStore();
const cartStore = useCartStore();

const openSizeChoice = ref(false);

const productExtra = computed(
  () => extras.find((extra) => extra?.id === props?.product?.extraId)?.name
);
const isSizeArray = computed(() => Array.isArray(props?.product?.size));
const defaultSize = computed(() =>
  isSizeArray?.value ? props?.product?.size[0] : 0
);

const sizeChoice = ref(defaultSize?.value);

const productSize = computed(() => {
  const propsProductSize = props?.product?.size;
  return getProductSize(
    isSizeArray?.value
      ? propsProductSize[0] +
          "-" +
          propsProductSize[propsProductSize.length - 1]
      : propsProductSize
  );
});
const productPrice = computed(() => {
  const propsProductPrice = props?.product?.price;
  if (Array.isArray(propsProductPrice)) {
    return (
      propsProductPrice[0] +
      "-" +
      propsProductPrice[propsProductPrice.length - 1] +
      " грн"
    );
  } else {
    return propsProductPrice + " грн";
  }
});
const productTotalPrice = computed(() => {
  const propsProductPrice = props?.product?.price;
  if (!Array.isArray(propsProductPrice)) {
    return propsProductPrice * props?.product?.quantity + " грн";
  }
});
const favoriteText = computed(() =>
  props?.product?.isFavorite ? "Вибране" : "Додати в вибране"
);
const cardTypeProduct = computed(() => props?.cardType === "product");
const cardTypeCart = computed(() => props?.cardType === "cart");
const cardTypeFavorite = computed(() => props?.cardType === "favorite");

function getProductSize(size) {
  return size + " " + props?.product?.measure;
}
function handleImageClick() {
  useOverPagesStore().setAllFalse();
}
function handleAddToCart() {
  if (isSizeArray?.value) {
    openSizeChoice.value = true;
  } else {
    cartStore?.addToCart(props?.product?.id);
  }
}
function addSizeToCart() {
  if (sizeChoice?.value) {
    cartStore?.addToCart(props?.product?.id, sizeChoice?.value);
    sizeChoice.value = defaultSize?.value;
    openSizeChoice.value = false;
  }
}
</script>
<template>
  <div
    v-if="product"
    class="w-full relative bg-zinc-900 rounded-xl shadow-sm shadow-zinc-800 sm:w-80 2xl:w-[22rem]"
    :class="{
      'custom-global-background-image-md !bg-transparent shadow-none flex flex-col sm:w-full md:items-center md:flex-row 2xl:w-full':
        cardTypeProduct,
      'sm:w-full sm:flex sm:flex-row sm:justify-center 2xl:w-full':
        cardTypeCart,
    }"
  >
    <div
      class="absolute top-0 left-0 right-0 w-full flex justify-between items-center px-4 py-4"
      :class="{
        'custom-global-px md:!bg-none lg:px-6 lg:pt-6': cardTypeProduct,
        'sm:rounded-t-xl sm:bg-none sm:px-6': cardTypeCart,
      }"
    >
      <p
        class="px-4 py-1 rounded-md h-fit uppercase font-bold"
        :class="{
          'bg-amber-600': product?.extraId === 1,
          'bg-red-700': product?.extraId === 2,
          'bg-green-600': product?.extraId === 3,
        }"
      >
        {{ productExtra }}
      </p>
      <div
        class="w-fit h-fit"
        :class="{
          'flex items-center gap-4': cardTypeProduct,
        }"
      >
        <p v-if="cardTypeProduct" class="text-zinc-300 hidden md:inline">
          {{ favoriteText }}
        </p>
        <i
          v-if="!cardTypeCart"
          class="fa-heart text-red-500 cursor-pointer text-3xl drop-shadow-sm transition-all duration-300 ease-in-out active:scale-125"
          :class="{
            'fa-regular': !product?.isFavorite,
            'fa-solid': product?.isFavorite,
            'fa-solid fa-xmark': cardTypeFavorite,
          }"
          @click="productsStore.toggleFavorite(product?.id)"
        ></i>
        <i
          v-else
          class="fa-solid fa-xmark text-red-500 cursor-pointer text-3xl drop-shadow-sm transition-all duration-300 ease-in-out active:scale-125"
          @click="cartStore?.removeFromCart(product?.id)"
        ></i>
      </div>
    </div>

    <RouterLink
      v-if="!cardTypeProduct"
      :to="'/product/' + product?.id"
      :class="{ 'sm:basis-1/2': cardTypeCart }"
      @click="handleImageClick"
      ><img
        :src="product?.imageUrl"
        :alt="product?.name"
        class="w-full h-56 2xl:h-72 object-cover rounded-t-xl"
        :class="{ 'sm:rounded-none sm:rounded-l-xl sm:h-80': cardTypeCart }"
    /></RouterLink>
    <div v-else class="h-96 w-full md:basis-1/2 md:h-[70vh]">
      <img
        :src="product?.imageUrl"
        :alt="product?.name"
        class="rounded-none w-full h-full object-cover md:rounded-none md:rounded-l-xl"
      />
    </div>
    <div
      class="h-64 px-4 py-6 flex flex-col justify-between gap-3 sm:h-72 md:h-64 2xl:h-72"
      :class="{
        'custom-global-px h-full gap-8 sm:h-full md:basis-1/2 md:py-16 md:h-full md:gap-10 2xl:h-auto':
          cardTypeProduct,
        'sm:basis-1/2 sm:py-12 sm:px-6 sm:w-full sm:min-w-0 sm:h-80 md:h-80':
          cardTypeCart,
      }"
    >
      <div>
        <h3
          class="font-bold text-xl sm:text-2xl"
          :class="{ truncate: !cardTypeProduct }"
        >
          {{ product?.name }}
        </h3>
        <p
          class="custom-global-text-light mt-1 text-lg"
          :class="{
            'line-clamp-3': !cardTypeProduct,
            'md:mt-4': cardTypeProduct,
          }"
        >
          {{ product?.description }}
        </p>
        <p v-if="cardTypeCart" class="my-2 text-lg text-red-300">
          {{ productSize }}
        </p>
      </div>
      <div
        class="flex flex-col md:justify-between"
        :class="{
          'h-full gap-12 sm:basis-1/2': cardTypeProduct,
          'gap-4 md:flex-row-reverse md:items-end': !cardTypeProduct,
        }"
      >
        <div
          v-if="!cardTypeCart"
          class="flex justify-between items-center"
          :class="{
            'w-fit flex-row-reverse gap-2': cardTypeProduct,
            'md:flex-col md:items-end': !cardTypeProduct,
          }"
        >
          <p
            class="text-red-300 text-lg"
            :class="{
              'md:text-xl': cardTypeProduct,
            }"
          >
            {{ productSize }}
          </p>
          <p
            :class="{
              hidden: !cardTypeProduct,
            }"
          >
            /
          </p>
          <h3 class="font-bold text-lg sm:text-xl">{{ productPrice }}</h3>
        </div>
        <div v-else class="flex justify-between items-center gap-4 w-full">
          <div
            class="flex justify-between gap-4 px-8 py-2 rounded-full text-lg border-2 border-red-500"
          >
            <button
              class="text-zinc-300 text-xl hover:text-white"
              @click="cartStore?.reduceQuantity(product?.id, product?.size)"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <p class="font-bold">{{ product?.quantity }}</p>
            <button
              class="text-zinc-300 text-xl hover:text-white"
              @click="cartStore?.addQuantity(product?.id, product?.size)"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <h3 class="font-bold text-xl sm:text-2xl text-end">
            {{ productTotalPrice }}
          </h3>
        </div>
        <GeneralButton
          v-if="!cardTypeCart"
          cart
          :big="cardTypeProduct"
          @click="handleAddToCart()"
          ><span>В кошик</span></GeneralButton
        >
      </div>
    </div>
    <Transition name="card-overlay">
      <div
        v-if="isSizeArray && openSizeChoice"
        class="absolute top-0 left-0 right-0 bottom-0 w-full h-full px-4 py-4 rounded-xl z-20 bg-zinc-950 border-2 border-red-500 flex flex-col justify-center items-center gap-8"
      >
        <h2 class="text-2xl text-center">Виберіть розмір</h2>
        <div class="flex flex-row justify-center items-center flex-wrap gap-2">
          <RadioInput
            v-for="size in product?.size"
            :name="'option-' + product?.id + '-' + size"
            :radio-value="size"
            :model-value="sizeChoice"
            :label="getProductSize(size)"
            @update:model-value="(newValue) => (sizeChoice = newValue)"
          />
        </div>

        <div
          class="flex flex-col gap-4 w-full justify-center items-center md:flex-row-reverse"
        >
          <GeneralButton @click="addSizeToCart()">Вибрати</GeneralButton>
          <GeneralButton outline @click="openSizeChoice = false"
            >Відмінити</GeneralButton
          >
        </div>
      </div>
    </Transition>
  </div>
  <div v-else class="text-xl text-center">Об'єкт не знайдено</div>
</template>
<style>
.card-overlay-enter-active,
.card-overlay-leave-active {
  @apply transition-all duration-300 ease-in-out;
}
.card-overlay-enter-from {
  @apply opacity-0 -translate-x-5 -skew-x-6;
}
.card-overlay-leave-to {
  @apply opacity-0 translate-x-5 -translate-y-5;
}
</style>
