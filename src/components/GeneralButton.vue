<script setup>
import { computed } from "vue";
import { gsap } from "gsap";
const props = defineProps({
  filled: { type: Boolean, default: false },
  outline: { type: Boolean, default: false },
  big: { type: Boolean, default: false },
  cart: { type: Boolean, default: false },
  close: { type: Boolean, default: false },
});
const filledComputed = computed(() => {
  return props.filled && props.outline ? true : props.outline ? false : true;
});
function cartButtonAnimation(e) {
  if (props?.cart) {
    const target = e?.currentTarget;
    target.disabled = true;
    gsap.to(target?.children[0], {
      opacity: 0,
      clipPath: "inset(0)",
      duration: .5,
    });
    gsap.fromTo(
      target?.children[1],
      { opacity: 0, xPercent: -50, scale: 1 },
      { opacity: 1, xPercent: 0, ease: "expo", duration: .5 }
    );
    gsap.to(target?.children[1], {
      opacity: 0,
      xPercent: 50,
      scale: 0.5,
      duration: 0.5,
      delay: 1,
    });
    gsap.fromTo(
      target?.children[0],
      { opacity: 0, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.5, delay: 1 }
    );
    setTimeout(() => {
      target.disabled = false;
    }, 2000);
  }
}
</script>
<template>
  <button
    class="w-full md:w-fit px-6 py-2 rounded-full transition-all duration-200 ease-in-out relative overflow-hidden"
    :class="{
      'bg-gradient-to-tr from-red-500 to-red-600 shadow-2xl shadow-red-500 hover:bg-gradient-to-r hover:shadow-xl hover:shadow-red-900':
        filledComputed,
      'outline outline-2 outline-offset-[-2px] outline-red-500 backdrop-blur-[1px] hover:bg-red-500 hover:bg-opacity-20':
        !filledComputed,
      'text-xl px-8 py-4': big,
      'active:translate-y-1': !cart && !close,
      '!w-16 !p-2 aspect-square': close,
      'custom-button-close': close,
    }"
    @click="cartButtonAnimation"
  >
    <slot></slot>
    <i
      v-if="cart"
      class="w-full fa-solid fa-cart-shopping text-lg absolute top-1/2 -translate-y-1/2 left-0 opacity-0"
    ></i>
    <i
      v-if="close"
      class="fa-solid fa-xmark text-2xl transition-all duration-300 ease-in-out"
    ></i>
  </button>
</template>
<style scoped>
.custom-button-close:hover i {
  @apply rotate-180;
}
</style>
