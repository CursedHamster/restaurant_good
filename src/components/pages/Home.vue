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
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    "#home_qualities",
    { opacity: 0, x: -100, skewX: "5deg" },
    {
      scrollTrigger: {
        trigger: "#home_qualities",
        toggleActions: "play pause resume reset",
      },
      opacity: 1,
      x: 0,
      skewX: 0,
      duration: 1,
    }
  );
  gsap.utils.toArray(".custom-home-quality").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: -50 },
      {
        scrollTrigger: {
          trigger: "#home_qualities",
          toggleActions: "play pause resume reset",
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: i * 0.3,
      }
    );
  });
  gsap.fromTo(
    "#home_contacts",
    { opacity: 0, x: 100, skewX: "5deg" },
    {
      scrollTrigger: {
        trigger: "#home_contacts",
        toggleActions: "play pause resume reset",
      },
      opacity: 1,
      x: 0,
      skewX: 0,
      duration: 1,
    }
  );
  gsap.utils.toArray(".custom-map-container").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 100 },
      {
        scrollTrigger: {
          trigger: "#home_contacts",
          toggleActions: "play pause resume reset",
        },
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: i * 0.3,
      }
    );
  });
  gsap.fromTo(
    "#home_testimonials",
    { opacity: 0, y: 200 },
    {
      scrollTrigger: {
        trigger: "#home_testimonials",
        toggleActions: "play pause resume reset",
      },
      opacity: 1,
      y: 0,
      ease: "slow",
      duration: 1,
    }
  );
  gsap.utils.toArray(".custom-testimonial").forEach((el, i) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: i % 2 === 0 ? 100 : -100,
        skewX: "5deg",
        scale: 0.5,
      },
      {
        scrollTrigger: {
          trigger: "#home_testimonials",
          toggleActions: "play pause resume reset",
        },
        opacity: 1,
        x: 0,
        skewX: 0,
        scale: 1,
        duration: 1,
        delay: i * 0.3,
      }
    );
  });
});
</script>
<template>
  <main
    role="main"
    class="w-full min-h-screen relative grid place-content-center text-center bg-gradient-to-b from-[#111827b7] to-zinc-950"
  >
    <video
      class="absolute top-0 left-0 right-0 bottom-0 z-[-1] w-full h-full object-cover min-h-full"
      src="/main-video.mp4"
      autoPlay
      loop
      muted
    />
    <div class="custom-global-px my-20 flex flex-col gap-6 max-w-5xl">
      <h2 class="text-3xl 2xl:text-5xl font-bold text-red-500">ГУД</h2>
      <h1 class="text-5xl 2xl:text-8xl my-4 2xl:my-10">У нас GOOD</h1>
      <p class="text-xl custom-global-text-light">
        Ласкаво запрошуємо в нашу піцерію, де смак та якість завжди на першому
        місці! Ми гордо представляємо широкий вибір піц, салатів, десертів та
        напоїв, приготованих з найкращих інгредієнтів. Завітайте до нас і
        насолоджуйтеся атмосферою дружнього середовища та чудовою їжею!
      </p>
      <div
        class="flex flex-col justify-center items-center gap-4 mt-4 md:flex-row md:gap-10"
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
      class="absolute left-0 right-0 bottom-7 mx-auto text-5xl text-red-800 w-fit animate-bounce"
    >
      <i class="fa-solid fa-chevron-down"></i>
    </a>
  </main>
  <section id="home_qualities" class="custom-global-px-md py-20">
    <ul
      class="custom-global-gradient-translucent-md rounded-xl flex flex-col justify-center items-center gap-20 px-8 py-16 w-fit mx-auto text-center md:px-20 lg:flex-row 2xl:max-w-[100rem]"
    >
      <li
        v-for="quality in qualities"
        class="custom-home-quality flex flex-col gap-2 basis-1/3"
      >
        <i
          class="text-red-500 text-3xl mb-2 2xl:text-4xl"
          :class="quality.iconClass"
        ></i>
        <h3 class="text-2xl font-bold 2xl:text-3xl">{{ quality.title }}</h3>
        <p class="custom-global-text-light">
          {{ quality.description }}
        </p>
      </li>
    </ul>
  </section>
  <section class="custom-global-px py-8">
    <h2 class="text-4xl 2xl:text-6xl text-center">Хіти продажів</h2>
    <div class="mt-6">
      <div v-for="type in typesData" class="py-8 w-full mx-auto">
        <RouterLink :to="'/menu#' + type?.name" class="block mb-10"
          ><CategoryTitle class="custom-category-title sm:w-1/4">{{
            type?.title
          }}</CategoryTitle></RouterLink
        >
        <ProductCarousel :type="type" />
      </div>
    </div>
  </section>
  <section
    id="home_contacts"
    class="py-8 flex flex-col md:flex-row-reverse md:justify-between md:gap-6 2xl:gap-20"
  >
    <div class="custom-global-px md:pl-0 md:flex-1">
      <h2 class="text-4xl 2xl:text-6xl text-center">Наші контакти</h2>
      <div
        class="flex flex-col py-8 gap-4 items-center md:pb-0 md:pt-4 2xl:pt-8"
      >
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
    <div class="w-full md:w-1/2">
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
    class="custom-global-gradient-translucent-md py-8 mt-20 rounded-t-[5rem]"
  >
    <h2 class="custom-global-px text-4xl 2xl:text-6xl text-center mt-8">
      Відгуки наших клієнтів
    </h2>
    <ul
      class="py-12 flex flex-col gap-10 md:px-8 md:flex-row md:flex-wrap md:justify-center 2xl:py-16 2xl:gap-16"
    >
      <li
        v-for="testimonial in testimonials"
        class="custom-testimonial px-7 py-6 bg-zinc-900 shadow-sm shadow-zinc-800 md:rounded-xl md:basis-5/12 md:text-center md:px-12 md:py-10 md:flex md:flex-col md:justify-center md:items-center"
      >
        <div class="flex items-center gap-3 md:flex-col">
          <h4 class="custom-global-text-light">{{ testimonial.name }}</h4>
          <div class="text-xs flex gap-0.5 text-red-500 md:text-base">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <p class="text-lg mt-5 font-bold 2xl:text-xl">
          {{ testimonial.description }}
        </p>
      </li>
    </ul>
  </section>
</template>
<style scoped>
.custom-map-container {
  @apply flex flex-col w-full;
}

.custom-map-container a {
  @apply font-bold text-xl;
}

.custom-map-description {
  @apply px-4 py-2 bg-zinc-900 rounded-b-md text-xl font-bold;
}
.custom-map-title {
  @apply bg-zinc-800 text-zinc-50 px-4 py-2 rounded-t-md flex items-center gap-2;
}
.custom-map-title i {
  @apply text-red-500 text-xl;
}
</style>
