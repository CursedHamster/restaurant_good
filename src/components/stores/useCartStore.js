import { ref, computed, watchEffect } from "vue";
import { defineStore } from "pinia";
import { useProductsStore } from "./useProductsStore";

export const useCartStore = defineStore("cart", () => {
  const productsStore = useProductsStore();
  const cartProducts = ref(getCartProductsFromLocalStorage());
  const totalPrice = computed(() =>
    cartProducts?.value?.length > 0
      ? cartProducts?.value?.reduce(
          (accumulator, current) =>
            accumulator + current?.price * current?.quantity,
          0
        )
      : 0
  );
  function getCartProductsFromLocalStorage() {
    const localCart = localStorage.getItem("cart");
    try {
      const localCartProducts = JSON.parse(localCart);
      return localCartProducts?.length > 0 ? localCartProducts : [];
    } catch (error) {
      return [];
    }
  }
  function findCartProductById(productId) {
    return cartProducts?.value?.find((product) => product?.id === productId);
  }
  function findCartProductByIdAndSize(productId, productSize) {
    return cartProducts?.value?.find(
      (product) => product?.id === productId && product?.size === productSize
    );
  }
  function addNewProductToCart(newCartProduct) {
    cartProducts?.value?.push({ ...newCartProduct, quantity: 1 });
  }
  function addToCart(productId, size) {
    const newCartProduct = productsStore?.findProductById(productId);
    if (newCartProduct) {
      const oldCartProduct = findCartProductById(productId);
      if (oldCartProduct) {
        if (size) {
          const sameSizeProduct = findCartProductByIdAndSize(productId, size);
          if (!sameSizeProduct) {
            const sizeIndex = newCartProduct?.size?.indexOf(size);
            if (sizeIndex !== -1) {
              addNewProductToCart({
                ...newCartProduct,
                size: newCartProduct?.size[sizeIndex],
                price: newCartProduct?.price[sizeIndex],
              });
            }
          } else {
            addQuantity(productId, size);
          }
        } else {
          addQuantity(productId);
        }
      } else {
        if (size) {
          const sizeIndex = newCartProduct?.size?.indexOf(size);
          if (sizeIndex !== -1) {
            addNewProductToCart({
              ...newCartProduct,
              size: newCartProduct?.size[sizeIndex],
              price: newCartProduct?.price[sizeIndex],
            });
          }
        } else {
          addNewProductToCart(newCartProduct);
        }
      }
    }
  }
  function removeFromCart(productId) {
    cartProducts.value = cartProducts?.value?.filter(
      (product) => product?.id !== productId
    );
  }
  function addQuantity(productId, productSize) {
    cartProducts.value = cartProducts?.value?.map((product) => {
      if (
        product?.id === productId &&
        (!productSize || product?.size === productSize)
      ) {
        const newQuantity = product?.quantity + 1;
        return { ...product, quantity: newQuantity < 99 ? newQuantity : 99 };
      } else {
        return product;
      }
    });
  }
  function reduceQuantity(productId, productSize) {
    cartProducts.value = cartProducts?.value?.map((product) => {
      if (
        product?.id === productId &&
        (!productSize || product?.size === productSize)
      ) {
        const newQuantity = product?.quantity - 1;
        return { ...product, quantity: newQuantity > 0 ? newQuantity : 1 };
      } else {
        return product;
      }
    });
  }

  watchEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts?.value));
  });

  return {
    cartProducts,
    totalPrice,
    addToCart,
    removeFromCart,
    addQuantity,
    reduceQuantity,
  };
});
