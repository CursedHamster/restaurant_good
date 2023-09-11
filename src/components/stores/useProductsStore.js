import { ref } from "vue";
import { defineStore } from "pinia";
import { useFavoritesStore } from "./useFavoritesStore";
import productsData from "../../assets/products";

export const useProductsStore = defineStore("allProducts", () => {
  const favoritesStore = useFavoritesStore();
  const products = ref(getProductsRef());
  function getProductsRef() {
    const savedFavorites = favoritesStore?.favoriteProducts;
    if (savedFavorites?.length > 0) {
      return productsData?.map((product) =>
        savedFavorites.includes(product?.id)
          ? { ...product, isFavorite: true }
          : product
      );
    } else {
      return productsData;
    }
  }
  function findProductById(id) {
    return products?.value?.find((product) => product?.id === id);
  }
  function toggleFavorite(id) {
    favoritesStore.toggleFavorite(id);
    products.value = products?.value?.map((product) => {
      if (product?.id === id) {
        const newIsFavorite = !product?.isFavorite;
        if (newIsFavorite) {
        }
        return { ...product, isFavorite: newIsFavorite };
      } else return product;
    });
  }
  function getRandomProduct() {
    return Math.floor(Math.random() * products?.value?.length + 1);
  }
  function findProducts(val) {
    return products?.value?.filter(
      (product) =>
        product?.name?.toLowerCase().includes(val) ||
        product?.description?.toLowerCase().includes(val)
    );
  }

  return {
    products,
    findProductById,
    toggleFavorite,
    getRandomProduct,
    findProducts,
  };
});
