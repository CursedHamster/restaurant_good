<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "../stores/useProductsStore";
import { useOverPagesStore } from "../stores/useOverPagesStore";
import OverContainer from "../OverContainer.vue";
import { RouterLink } from "vue-router";
const overPagesStore = useOverPagesStore();
const productsStore = useProductsStore();
const searchInput = ref("");
const vFocus = { mounted: (el) => el.focus() };
const foundProducts = computed(() => {
  const products = productsStore
    .findProducts(searchInput?.value?.toLowerCase())
    ?.slice(0, 10);
  return products ? products : [];
});
const router = useRouter();
function submit() {
  overPagesStore?.changeOpenSearch(false);
  if (searchInput?.value && searchInput?.value !== "") {
    router.push("/search-results?s=" + searchInput?.value);
    searchInput.value = "";
  }
}
</script>
<template>
  <OverContainer
    title="Пошук"
    :show-page="overPagesStore?.openSearch"
    @close-container="overPagesStore?.changeOpenSearch(false)"
  >
    <div class="w-full max-w-3xl">
      <form
        class="flex justify-between items-center gap-4 w-full text-lg mt-20"
      >
        <input
          type="text"
          name="s"
          v-model.trim="searchInput"
          placeholder="Введіть назву..."
          v-focus
          class="px-4 py-2 w-full bg-transparent border-b-2 border-zinc-800 transition duration-300 ease-in-out focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          class="text-3xl text-red-500 cursor-pointer"
          @click.stop.prevent="submit"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <ul
        v-if="searchInput && searchInput !== ''"
        class="flex flex-col gap-2 w-full mt-4 text-lg text-zinc-300"
      >
        <li v-for="product in foundProducts" class="w-full">
          <RouterLink
            :to="'/product/' + product?.id"
            class="w-full block p-2 truncate"
            @click="overPagesStore?.changeOpenSearch(false)"
            >{{ product?.name }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </OverContainer>
</template>
<style scoped></style>
