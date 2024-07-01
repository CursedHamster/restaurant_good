<script setup>
import GoodLogo from "../assets/logo.svg?url";
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
<template>
  <footer class="custom-global-px py-10 bg-zinc-900">
    <div class="flex flex-col justify-between items-center gap-12 md:flex-row">
      <a href="/" class="flex flex-col items-center gap-4 md:basis-1/3 md:items-start">
        <img :src="GoodLogo" alt="GOOD Restaurant Logo" class="w-16 md:w-10" />
        <p class="text-2xl md:hidden">Піцерія «ГУД»</p>
        <!-- <svg
          class="w-8 h-8 fill-red-500"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            transform="matrix(2.5936980247497563, 0, 0, 2.596596002578736, -409.39389648130384, -152.14753949862026)"
            style=""
          >
            <rect x="154.4" y="55.6" width="87.134" height="28.044" style="" />
            <rect
              x="188.923"
              y="155.592"
              width="131.114"
              height="30.213"
              style="transform-box: fill-box; transform-origin: 50% 50%"
              transform="matrix(0, 1, -1, 0, -84.974354, -49.54162)"
            />
            <rect
              x="185.877"
              y="148.173"
              width="129.001"
              height="28.772"
              style="transform-origin: 250.377px 162.559px"
              transform="matrix(0, 1, -1, 0, 89.331047, 28.050094)"
            />
            <rect
              x="222.479"
              y="228.973"
              width="129.228"
              height="27.325"
              style="transform-origin: 287.092px 242.636px"
            />
            <rect
              x="327.008"
              y="107.372"
              width="226.945"
              height="20.85"
              style="transform-origin: 440.482px 117.797px"
              transform="matrix(-0.707045, 0.707168, -0.70269, -0.711524, -158.044574, 67.09406)"
            />
            <rect
              x="412.123"
              y="136.64"
              width="286.017"
              height="26.533"
              style="transform-origin: 555.133px 149.908px"
              transform="matrix(-0.707045, 0.707168, -0.70269, -0.711524, -301.513934, 5.06208)"
            />
            <rect
              x="177.172"
              y="136.757"
              width="122.96"
              height="26.556"
              style="transform-origin: 238.653px 150.036px"
              transform="matrix(-0.7661, -0.642721, 0.647573, -0.76203, -17.831379, -32.534766)"
            />
          </g>
        </svg> -->
      </a>
      <div
        class="text-lg 2xl:text-xl flex justify-center gap-6 md:basis-1/3 2xl:gap-6"
      >
        <RouterLink class="custom-nav-general-link" to="/">Головна</RouterLink>
        <RouterLink class="custom-nav-general-link" to="/menu">Меню</RouterLink>
        <RouterLink class="custom-nav-general-link" to="/delivery-info"
          >Доставка</RouterLink
        >
      </div>
      <div
        class="custom-global-text-light text-4xl flex gap-8 justify-center items-center md:basis-1/3 md:justify-end"
      >
        <a href="#"><i class="fa-brands fa-facebook"></i></a>
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
        <button
          @click="scrollToTop"
          class="text-red-500 transition-all duration-300 ease-in-out hover:-translate-y-1"
        >
          <i class="fa-solid fa-circle-chevron-up"></i>
        </button>
      </div>
    </div>
    <p class="text-center text-sm text-zinc-400 mt-10 md:w-full">2023 © Всі права захищені</p>
  </footer>
</template>
<style scoped></style>
