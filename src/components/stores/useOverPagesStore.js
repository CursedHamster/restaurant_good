import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useOverPagesStore = defineStore("overPages", () => {
  const openFavorites = ref(false);
  const openSearch = ref(false);
  const openCart = ref(false);
  const openReserve = ref(false);
  const openOrder = ref(false);
  function changeOpenFavorites(val) {
    openFavorites.value = val;
  }
  function changeOpenSearch(val) {
    openSearch.value = val;
  }
  function changeOpenCart(val) {
    openCart.value = val;
  }
  function changeOpenReserve(val) {
    openReserve.value = val;
  }
  function changeOpenOrder(val) {
    openOrder.value = val;
  }
  function setAllFalse() {
    openFavorites.value = false;
    openSearch.value = false;
    openCart.value = false;
    openReserve.value = false;
    openOrder.value = false;
  }

  watch(
    () =>
      openFavorites.value ||
      openSearch.value ||
      openCart.value ||
      openReserve.value ||
      openOrder.value,
    (val) => {
      if (val) {
        document.querySelector("html").classList.add("overflow-hidden");
      } else {
        document.querySelector("html").classList.remove("overflow-hidden");
      }
    }
  );
  return {
    openFavorites,
    changeOpenFavorites,
    openSearch,
    changeOpenSearch,
    openCart,
    changeOpenCart,
    openReserve,
    changeOpenReserve,
    openOrder,
    changeOpenOrder,
    setAllFalse,
  };
});
