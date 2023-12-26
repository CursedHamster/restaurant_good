<script setup>
import { ref, onMounted } from "vue";
import { useOverPagesStore } from "./stores/useOverPagesStore";
const openNav = ref(null);
const overPagesStore = useOverPagesStore();
function handleClick(e) {
  if (openNav.value) {
    openNav.value = false;
  }
}
onMounted(() => {
  function nullifyOpenNav(e) {
    if (e.target.innerWidth >= 768) openNav.value = null;
  }
  window.addEventListener("resize", nullifyOpenNav);
  return () => window.removeEventListener("resize", nullifyOpenNav);
});
</script>
<template>
  <header id="header" class="fixed w-full z-[1000]" role="banner">
    <nav
      class="custom-global-px flex max-md:justify-between py-5 md:py-2 relative items-center bg-gradient-to-b from-zinc-900 via-[#18181bc2] to-transparent to-100% text-lg 2xl:text-xl"
      role="navigation"
    >
      <RouterLink
        to="/"
        class="md:hidden flex gap-2 text-xl font-bold"
        @click="handleClick"
      >
        <svg
          class="w-7 max-h-10 fill-red-500"
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
        </svg>
        ГУД
      </RouterLink>

      <div
        class="flex md:w-full md:justify-between md:items-center max-md:absolute max-md:bg-gradient-to-bl max-md:from-zinc-950 max-md:to-[#18181bea] max-md:shadow-sm max-md:shadow-zinc-800 max-md:backdrop-blur-[2px] max-md:flex-col max-md:right-0 max-md:top-full max-md:w-full max-md:px-7 max-md:py-4 max-md:text-center"
        :class="{
          'max-md:translate-x-full': !openNav,
          'custom-nav-menu-out': !openNav && openNav !== null,
          'custom-nav-menu-in': openNav,
        }"
      >
        <div
          class="md:basis-5/12 flex items-center gap-4 max-md:flex-col max-md:border-b-2 max-md:border-zinc-600 max-md:border-opacity-20 max-md:py-5"
        >
          <RouterLink
            class="custom-nav-general-link"
            to="/"
            @click="handleClick"
            >Головна</RouterLink
          >
          <RouterLink
            class="custom-nav-general-link"
            to="/menu"
            @click="handleClick"
            >Меню</RouterLink
          >
          <RouterLink
            class="custom-nav-general-link"
            to="/delivery-info"
            @click="handleClick"
            >Доставка</RouterLink
          >
        </div>
        <RouterLink
          to="/"
          class="max-md:hidden md:basis-2/12 flex justify-center"
          @click="handleClick"
        >
          <svg
            class="max-w-10 max-h-10 fill-red-500"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              transform="matrix(2.5936980247497563, 0, 0, 2.596596002578736, -409.39389648130384, -152.14753949862026)"
              style=""
            >
              <rect
                x="154.4"
                y="55.6"
                width="87.134"
                height="28.044"
                style=""
              />
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
          </svg>
        </RouterLink>
        <div
          class="md:basis-5/12 flex md:justify-end items-center gap-4 max-md:flex-col py-5"
        >
          <a class="custom-nav-icon-link" href="tel:+380666666666">
            <i class="fa-solid fa-phone"></i>
            <span class="lg:!block">+38 (066) 66 66 666</span></a
          >
          <button
            class="custom-nav-icon-link"
            @click="
              () => {
                handleClick();
                overPagesStore?.changeOpenFavorites(true);
              }
            "
          >
            <i class="fa-solid fa-heart"></i>
            <span>Вибране</span>
          </button>
          <button
            class="custom-nav-icon-link"
            @click="
              () => {
                handleClick();
                overPagesStore?.changeOpenCart(true);
              }
            "
          >
            <i class="fa-solid fa-shopping-cart"></i> <span>Кошик</span>
          </button>
          <button
            class="custom-nav-icon-link"
            @click="
              () => {
                handleClick();
                overPagesStore?.changeOpenSearch(true);
              }
            "
          >
            <i class="fa-solid fa-search"></i> <span>Пошук</span>
          </button>
        </div>
        <div
          class="text-4xl flex gap-6 justify-center py-5 md:hidden max-md:border-t-2 max-md:border-zinc-600 max-md:border-opacity-20"
        >
          <a href="#"><i class="fa-brands fa-facebook"></i></a>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>

      <button class="w-8 h-8 relative md:hidden" @click="openNav = !openNav">
        <span class="sr-only">Відкрити головне меню</span>
        <div class="w-8 absolute top-1/2 right-0">
          <span
            aria-hidden="true"
            class="block absolute h-1 w-8 rounded-full bg-current transform transition duration-300 ease-in-out"
            :class="{ 'rotate-45': openNav, ' -translate-y-2.5': !openNav }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-1 w-8 rounded-full bg-current transform transition duration-300 ease-in-out"
            :class="{ 'opacity-0': openNav }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-1 w-8 rounded-full bg-current transform transition duration-300 ease-in-out"
            :class="{ '-rotate-45': openNav, ' translate-y-2.5': !openNav }"
          ></span>
        </div>
      </button>
    </nav>
  </header>
</template>
<style scoped>
.custom-nav-general-link {
  @apply md:relative  md:after:h-1  md:after:w-0  md:after:bg-red-800  md:after:absolute  md:after:-bottom-2  md:after:left-0  md:after:rounded-full  md:after:transition-all  md:after:duration-300  md:after:ease-in-out  md:hover:after:w-1/3 md:active:after:w-full;
}
.custom-nav-icon-link {
  @apply flex gap-2 items-center max-md:justify-end;
}
.custom-nav-icon-link i {
  @apply text-red-500 text-xl transition-all duration-300 ease-out;
}
.custom-nav-icon-link:hover i {
  @apply text-red-800 -translate-y-0.5;
}
.custom-nav-icon-link:active i {
  @apply translate-y-0.5;
}
.custom-nav-icon-link span {
  @apply md:max-2xl:hidden;
}

.custom-nav-menu-in {
  @apply max-md:animate-[menu-slide-in_1s_ease-in-out];
}

.custom-nav-menu-out {
  @apply max-md:animate-[menu-slide-out_1s_ease-in-out];
}

@keyframes menu-slide-in {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  50% {
    opacity: 100%;
    transform: translateX(0);
  }
}
@keyframes menu-slide-out {
  0% {
    opacity: 100%;
    transform: translateX(0);
  }
  50% {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
