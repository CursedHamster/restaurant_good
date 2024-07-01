<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductsStore } from "../stores/useProductsStore";
import { useOverPagesStore } from "../stores/useOverPagesStore";
import GeneralButton from "../GeneralButton.vue";
import CategoryTitle from "../CategoryTitle.vue";
import ProductCarousel from "../ProductCarousel.vue";
import typesData from "../../assets/types";
const qualities = [
  {
    iconClass: "fa-solid fa-bowl-rice",
    title: "Унікальні смакові поєднання",
    description:
      "Наш ресторан славиться своїми авторськими рецептами, які створюють незабутній кулінарний досвід",
  },
  {
    iconClass: "fa-solid fa-seedling",
    title: "Якість та свіжість наших продуктів",
    description:
      "Ми завжди використовуємо тільки свіжі та натуральні інгредієнти, щоб забезпечити вашому обіду найкращий смак",
  },
  {
    iconClass: "fa-solid fa-face-smile-wink",
    title: "Привітний та дружній персонал",
    description:
      "Наша команда завжди готова зустріти вас з посмішкою і зробити ваше відвідування найприємнішим",
  },
];
const testimonials = [
  {
    name: "Ірина",
    description:
      "Неймовірно смачна їжа! Обов'язково спробуйте піцу Гуд - це справжній кулінарний шедевр!",
  },
  {
    name: "Дмитро",
    description:
      "Завжди зупиняюсь тут на обід під час робочого перерви. Великий вибір страв та швидке обслуговування - це те, що мені потрібно",
  },
  {
    name: "Олександра",
    description:
      "Чудове обслуговування і приємна атмосфера. Це ідеальне місце для вечері з друзями",
  },
];
const productsStore = useProductsStore();
const overPagesStore = useOverPagesStore();
const animationDuration = 0.5;
const animationStagger = 0.1;
const getScrollTrigger = (el) => ({
  trigger: el,
  toggleActions: "play none none none",
});
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  // gsap.from("#home_qualities", {
  //   autoAlpha: 0,
  //   yPercent: -50,
  //   duration: 1,
  //   scrollTrigger: {
  //     trigger: "#home_qualities",
  //     toggleActions: "play pause resume reset",
  //   },
  // });
  // gsap.utils.toArray(".custom-home-quality").forEach((el, i) => {
  //   gsap.fromTo(
  //     el,
  //     { opacity: 0, y: -50 },
  //     {
  //       scrollTrigger: {
  //         trigger: "#home_qualities",
  //         toggleActions: "play pause resume reset",
  //       },
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.5,
  //       delay: i * 0.3,
  //     }
  //   );
  // });
  // gsap.fromTo(
  //   "#home_contacts",
  //   { opacity: 0, x: 100, skewX: "5deg" },
  //   {
  //     scrollTrigger: {
  //       trigger: "#home_contacts",
  //       toggleActions: "play pause resume reset",
  //     },
  //     opacity: 1,
  //     x: 0,
  //     skewX: 0,
  //     duration: 1,
  //   }
  // );
  // gsap.utils.toArray(".custom-map-container").forEach((el, i) => {
  //   gsap.fromTo(
  //     el,
  //     { opacity: 0, x: 100 },
  //     {
  //       scrollTrigger: {
  //         trigger: "#home_contacts",
  //         toggleActions: "play pause resume reset",
  //       },
  //       opacity: 1,
  //       x: 0,
  //       duration: 0.5,
  //       delay: i * 0.3,
  //     }
  //   );
  // gsap.fromTo(
  //   "#home_testimonials",
  //   { opacity: 0, y: 200 },
  //   {
  //     scrollTrigger: {
  //       trigger: "#home_testimonials",
  //       toggleActions: "play pause resume reset",
  //     },
  //     opacity: 1,
  //     y: 0,
  //     ease: "slow",
  //     duration: 1,
  //   }
  // );
  // gsap.utils.toArray(".custom-testimonial").forEach((el, i) => {
  //   gsap.fromTo(
  //     el,
  //     {
  //       opacity: 0,
  //       x: i % 2 === 0 ? 100 : -100,
  //       skewX: "5deg",
  //       scale: 0.5,
  //     },
  //     {
  //       scrollTrigger: {
  //         trigger: "#home_testimonials",
  //         toggleActions: "play pause resume reset",
  //       },
  //       opacity: 1,
  //       x: 0,
  //       skewX: 0,
  //       scale: 1,
  //       duration: 1,
  //       delay: i * 0.3,
  //     }
  //   );
  // });
  gsap.from("#home_qualities", {
    scrollTrigger: getScrollTrigger("#home_qualities"),
    autoAlpha: 0,
    duration: animationDuration,
  });
  gsap.from(".custom-home-quality>*", {
    scrollTrigger: getScrollTrigger(".custom-home-quality"),
    autoAlpha: 0,
    yPercent: 200,
    // scale: 0.9,
    duration: animationDuration,
    // stagger: 0.05,
  });
  gsap.from(".custom-map", {
    scrollTrigger: getScrollTrigger(".custom-map"),
    autoAlpha: 0,
    x: -50,
    duration: animationDuration,
  });
  gsap.from(".custom-map-container", {
    scrollTrigger: getScrollTrigger(".custom-map-container"),
    autoAlpha: 0,
    yPercent: 100,
    duration: animationDuration,
    stagger: animationStagger,
  });
  gsap.from(".custom-testimonial", {
    scrollTrigger: getScrollTrigger(".custom-testimonial"),
    autoAlpha: 0,
    yPercent: 50,
    // scale: 0.5,
    duration: animationDuration,
    stagger: animationStagger,
  });
});
</script>
<template>
  <main
    role="main"
    class="w-full min-h-screen relative grid place-content-center text-center"
  >
    <!-- <video
      class="absolute top-0 left-0 right-0 bottom-0 z-[-1] w-full h-full object-cover min-h-full"
      src="/main-video.mp4"
      autoPlay
      loop
      muted
    /> -->
    <div class="absolute top-0 left-0 right-0 bottom-0 z-[-1] w-full h-full">
      <video
        class="w-full h-full object-cover min-h-full"
        src="/main-video.mp4"
        autoPlay
        loop
        muted
      />
    </div>
    <div
      class="absolute top-0 left-0 right-0 bottom-0 z-[-1] w-full h-full bg-gradient-to-b from-[#16161cdc] to-zinc-950"
    ></div>
    <div
      class="custom-global-px my-20 flex flex-col gap-10 max-w-5xl xl:max-w-7xl"
    >
      <h2 class="text-3xl 2xl:text-5xl font-bold text-red-500">ГУД</h2>
      <h1 class="font-bold text-5xl md:text-7xl xl:text-9xl">У нас GOOD</h1>
      <p class="custom-global-text-light xl:text-2xl">
        Ласкаво запрошуємо до нашої піцерії, де смак та якість завжди на першому
        місці! Ми гордо представляємо широкий вибір піц, салатів, десертів та
        напоїв, приготованих з найкращих інгредієнтів
      </p>
      <div
        class="flex flex-col justify-center items-center gap-4 mt-10 md:flex-row md:gap-10"
      >
        <GeneralButton filled big @click="$router.push('/menu')"
          >Перейти у меню</GeneralButton
        >
        <GeneralButton
          outline
          big
          @click="$router.push('/product/' + productsStore?.getRandomProduct())"
          >Випадкова страва</GeneralButton
        >
      </div>
    </div>
    <a
      href="#home_qualities"
      class="absolute left-0 right-0 bottom-7 mx-auto text-5xl text-red-500 w-fit animate-bounce"
    >
      <i class="fa-solid fa-chevron-down"></i>
    </a>
  </main>
  <section id="home_qualities" class="custom-global-px custom-global-py">
    <ul
      class="custom-global-background-image-md rounded-xl flex flex-col justify-center items-center gap-20 w-fit mx-auto text-center md:px-28 md:py-20 md:overflow-hidden lg:flex-row lg:px-10 lg:gap-6 lg:items-start xl:gap-10 2xl:max-w-[100rem] 2xl:px-20 2xl:gap-16"
    >
      <li
        v-for="quality in qualities"
        class="custom-home-quality flex flex-col gap-4 basis-1/3 2xl:gap-6"
      >
        <i
          class="text-red-500 text-6xl mb-2 lg:text-5xl"
          :class="quality.iconClass"
        ></i>
        <h3 class="text-2xl font-bold 2xl:text-3xl">{{ quality.title }}</h3>
        <p class="custom-global-text-light">
          {{ quality.description }}
        </p>
      </li>
    </ul>
  </section>
  <section class="custom-global-px custom-global-py">
    <h2 class="custom-global-title">Хіти продажів</h2>
    <div class="mt-6 flex flex-col gap-24 md:gap-32">
      <div v-for="(type, i) in typesData" class="w-full mx-auto">
        <RouterLink :to="'/menu#' + type?.name" class="block mb-10 md:mb-16"
          ><CategoryTitle class="custom-category-title" :index="i + 1">{{
            type?.title
          }}</CategoryTitle></RouterLink
        >
        <ProductCarousel :type="type" />
      </div>
    </div>
  </section>
  <section
    id="home_contacts"
    class="custom-global-py flex flex-col gap-16 md:flex-row-reverse md:justify-between md:gap-10 lg:gap-16 2xl:gap-20"
  >
    <div class="custom-global-px md:pl-0 md:flex-1">
      <h2 class="custom-global-title-w-m">Наші контакти</h2>
      <div class="flex flex-col py-10 gap-8 items-center md:py-12 md:pb-0 2xl:pt-16">
        <div class="custom-map-container">
          <div class="custom-map-title">
            <i class="fa-solid fa-location-dot"></i>
            Адреса
          </div>
          <a
            class="custom-map-description"
            href="https://goo.gl/maps/AGRGunmodkrJDCZJ7"
            target="_blank"
            >вул. Повстанська, 7, Львів, Львівська область</a
          >
        </div>
        <div class="custom-map-container">
          <div class="custom-map-title">
            <i class="fa-solid fa-phone"></i>
            Телефон
          </div>
          <a class="custom-map-description" href="tel:+380666666666"
            >+38 (066) 66 66 666</a
          >
        </div>
        <div class="custom-map-container">
          <div class="custom-map-title">
            <i class="fa-solid fa-clock"></i>
            Розклад
          </div>
          <div class="custom-map-description">
            <p>11:00 - 22:00</p>
          </div>
        </div>
        <GeneralButton
          big
          class="my-4 md:my-2 2xl:my-4"
          @click="overPagesStore?.changeOpenReserve(true)"
          >Забронювати стіл</GeneralButton
        >
      </div>
    </div>
    <div class="w-full md:w-1/2 custom-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.841531763981!2d23.997392477025947!3d49.82664353208204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae781bb88b49f%3A0x3f728d49965f11b0!2sPovstanska%20St%2C%207%2C%20L&#39;viv%2C%20L&#39;vivs&#39;ka%20oblast%2C%2079000!5e0!3m2!1sen!2sua!4v1693500069665!5m2!1sen!2sua"
        width="100%"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="h-96 md:h-full md:rounded-r-xl"
      ></iframe>
    </div>
  </section>
  <section
    id="home_testimonials"
    class="custom-global-px custom-global-py bg-transparent rounded-t-[5rem] md:bg-zinc-900 md:bg-opacity-20"
  >
    <h2 class="custom-global-title">Відгуки наших клієнтів</h2>
    <ul
      class="flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center 2xl:py-4 2xl:gap-10"
    >
      <li
        v-for="testimonial in testimonials"
        class="custom-testimonial custom-global-background-image shadow-sm shadow-zinc-800 rounded-xl px-6 py-6 w-full text-center flex flex-col justify-center items-center md:px-12 md:py-10 lg:max-w-lg 2xl:max-w-xl"
      >
        <div class="flex flex-col items-center gap-1">
          <h4 class="custom-global-text-light text-base">
            {{ testimonial.name }}
          </h4>
          <div class="text-xs flex gap-0.5 text-red-500 md:text-base">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <p class="text-lg mt-4 2xl:text-xl">
          {{ testimonial.description }}
        </p>
      </li>
    </ul>
  </section>
</template>
<style scoped>
.custom-map-container {
  /* @apply flex flex-col w-full; */
  @apply flex flex-col items-center w-full gap-2 md:items-start md:gap-4;
}

/* .custom-map-container a {
  @apply font-bold text-2xl;
} */

.custom-map-description {
  /* @apply px-4 py-2 bg-zinc-900 rounded-b-md text-xl font-bold; */
  @apply text-2xl text-center md:text-start;
}
.custom-map-title {
  /* @apply bg-zinc-800 text-zinc-50 px-4 py-2 rounded-t-md flex items-center gap-2; */
  @apply font-bold text-lg text-zinc-50 flex items-center gap-2;
}
.custom-map-title i {
  @apply text-red-500 text-xl;
}
</style>
