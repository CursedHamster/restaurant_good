import { ref, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteProducts = ref(getFavoriteProductsFromLocalStorage());

  function getFavoriteProductsFromLocalStorage() {
    const localFavorites = localStorage.getItem("favorites");
    try {
      const localFavoriteProducts = JSON.parse(localFavorites);
      return localFavoriteProducts?.length > 0 ? localFavoriteProducts : [];
    } catch (error) {
      return [];
    }
  }

  function toggleFavorite(id) {
    if (!favoriteProducts?.value?.find((val) => val === id)) {
      favoriteProducts.value.push(id);
    } else {
      favoriteProducts.value = favoriteProducts?.value?.filter(
        (val) => val !== id
      );
    }
  }

  watchEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts?.value));
  });
  return {
    favoriteProducts,
    toggleFavorite,
  };
});
