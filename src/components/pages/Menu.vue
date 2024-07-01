<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import { useProductsStore } from "../stores/useProductsStore";
import ProductGallery from "../ProductGallery.vue";
import CategoryTitle from "../CategoryTitle.vue";
import typesData from "../../assets/types";
const productsStore = useProductsStore();
const activeType = ref(typesData[0]?.name);
const typeElements = ref([]);

function addFixed() {
  const element = document.querySelector("#menu_nav");
  const sectionsState = Flip.getState("#menu_sections", { simple: true });
  if (!element.classList.contains("fixed")) {
    element.classList.add("fixed");
  }
  Flip.from(sectionsState, { duration: 0.5 });
}

function removeFixed() {
  const element = document.querySelector("#menu_nav");
  const sectionsState = Flip.getState("#menu_sections", { simple: true });
  if (element.classList.contains("fixed")) {
    element.classList.remove("fixed");
  }
  Flip.from(sectionsState, { duration: 0.5 });
}

function getType(type, step) {
  const typeIndex = typesData?.findIndex((typeData) => typeData?.name === type);
  if (typeIndex >= 0) {
    const newTypeIndex = typeIndex + step;
    if (newTypeIndex >= 0 && newTypeIndex < typesData?.length) {
      return typesData[newTypeIndex]?.name;
    } else return type;
  } else return type;
}

function setActive(typeElement) {
  activeType.value = typeElement?.id;
}

function removeActive(typeElement, step) {
  const typeId = typeElement?.id;
  if (activeType?.value === typeId) {
    activeType.value = getType(typeId, step);
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, Flip);
  gsap.timeline({
    scrollTrigger: {
      trigger: "#menu_title",
      scrub: true,
      start: "bottom 90px",
      onEnter: addFixed,
      onLeaveBack: removeFixed,
    },
  });
  const routeHash = useRoute().hash;
  if (routeHash) {
    const router = useRouter();
    router.push(routeHash);
  }
  typeElements?.value?.forEach((typeElement) => {
    ScrollTrigger.create({
      trigger: typeElement,
      onEnter: () => setActive(typeElement),
      onLeave: () => removeActive(typeElement, 1),
      onLeaveBack: () => removeActive(typeElement, -1),
    });
    // ScrollTrigger.observe({id: typeElement?.id, target: typeElement, type: "wheel,scroll",
    // onToggleY: (self) => console.log("velocity: " + self?.velocityX + " " + self?.velocityY, "delta: " + self?.deltaX + " " + self?.deltaY, "last event: " + self?.event)
    //   // onToggleY: setActive(typeElement)
    // })
  });
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry, i) => {
  //       const intersecting = entry?.isIntersecting;
  //       const typeName = entry?.target?.id;
  //       if (intersecting) {
  //         activeType.value = typeName;
  //       }
  //     });
  //   },
  //   {
  //     threshold: [
  //       0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
  //       0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 0.1,
  //     ],
  //   }
  // );
  // typeElements?.value?.forEach((typeElement) => observer.observe(typeElement));

  // return () => observer.disconnect();
});
</script>
<template>
  <main
    id="menu"
    role="main"
    class="custom-global-py flex-1 flex flex-col items-center"
  >
    <h1
      id="menu_title"
      class="custom-global-px custom-global-title-w-m !text-start mt-8 mb-10 sm:w-full"
    >
      Меню
    </h1>
    <nav id="menu_nav" class="w-full top-[90px] z-50">
      <div
        class="custom-global-px custom-menu-nav flex items-center gap-2 overflow-x-auto lg:gap-4"
      >
        <RouterLink
          v-for="type in typesData"
          :to="'#' + type?.name"
          class="px-4 py-2 rounded-full bg-zinc-900 text-center border-2 border-zinc-800 sm:px-6"
          :class="{ '!border-red-500': type?.name === activeType }"
          >{{ type?.title }}</RouterLink
        >
      </div>
    </nav>
    <div
      id="menu_sections"
      class="custom-global-px flex flex-col items-center gap-16 mt-12 w-full md:mt-20 md:gap-32"
    >
      <section
        v-for="(type, i) in typesData"
        :id="type?.name"
        ref="typeElements"
        role="region"
        class="relative w-full"
      >
        <div class="flex flex-col items-center w-full">
          <CategoryTitle class="mb-4" :index="i + 1">{{
            type?.title
          }}</CategoryTitle>
          <ProductGallery
            :products="
              productsStore?.products?.filter(
                (product) => product?.typeId === type?.id
              )
            "
          />
        </div>
      </section>
    </div>
  </main>
</template>
<style scoped>
.custom-menu-nav::-webkit-scrollbar {
  display: none;
}
</style>
