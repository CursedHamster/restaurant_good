<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductsStore } from "../stores/useProductsStore";
import ProductGallery from "../ProductGallery.vue";
import CategoryTitle from "../CategoryTitle.vue";
import typesData from "../../assets/types";
const productsStore = useProductsStore();
const activeType = ref(typesData[0]?.name);
const typeElements = ref([]);
onMounted(() => {
  const routeHash = useRoute().hash;
  if (routeHash) {
    const router = useRouter();
    router.push(routeHash);
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        const intersecting = entry?.isIntersecting;
        const typeName = entry?.target?.id;
        if (intersecting) {
          activeType.value = typeName;
        }
      });
    },
    {
      threshold: [
        0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
        0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 0.1,
      ],
    }
  );
  typeElements?.value?.forEach((typeElement) => observer.observe(typeElement));

  return () => observer.disconnect();
});
</script>
<template>
  <main role="main" class="custom-global-py flex-1 flex flex-col items-center">
    <h1 class="custom-global-px text-4xl 2xl:text-6xl mt-8 sm:w-full">Меню</h1>
    <nav class="w-full pt-8 sticky top-10 z-50">
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
      class="custom-global-px flex flex-col items-center gap-32 mt-10 w-full"
    >
      <section
        v-for="type in typesData"
        :id="type?.name"
        ref="typeElements"
        role="region"
        class="relative w-full"
      >
        <div class="flex flex-col items-center w-full">
          <CategoryTitle class="mb-8">{{ type?.title }}</CategoryTitle>
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
