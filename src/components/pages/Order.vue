<script setup>
import { reactive, computed } from "vue";
import { useOverPagesStore } from "../stores/useOverPagesStore";
import dateAndTimeUtils from "../utils/dateAndTimeUtils";
import OverContainer from "../OverContainer.vue";
import GeneralButton from "../GeneralButton.vue";
import FormInput from "../formComponents/FormInput.vue";
import TextArea from "../formComponents/TextArea.vue";
import RadioInput from "../formComponents/RadioInput.vue";
const overPagesStore = useOverPagesStore();
const orderInfo = reactive({
  choice: "Самовивіз",
  name: "",
  date: "",
  time: "",
  phone: "",
  people: 1,
  comment: "",
});
const dateOptions = computed(() => {
  const todayDate = Date.now();
  const hoursNow = new Date().getHours();
  const startDate = hoursNow >= dateAndTimeUtils?.endHour ? 1 : 0;
  const dates = [];
  for (let i = startDate; i < 7; i++) {
    dates?.push(
      dateAndTimeUtils?.getDateString(
        dateAndTimeUtils?.addDaysToDate(todayDate, i)
      )
    );
  }
  return dates;
});
const timeOptions = computed(() => {
  const hoursNow = new Date().getHours();
  const minutesNow = new Date().getMinutes();
  const chosenDate = dateAndTimeUtils?.getDateDay(orderInfo?.date);
  const dateToday = new Date().getDate();
  const hours = [];
  for (
    let i = dateAndTimeUtils?.startHour;
    i <= dateAndTimeUtils?.endHour;
    i += 0.5
  ) {
    if (chosenDate && chosenDate === dateToday) {
      if ((hoursNow === i && minutesNow < 30) || hoursNow < parseInt(i)) {
        hours?.push(dateAndTimeUtils?.getTimeString(i));
      }
    } else {
      hours?.push(dateAndTimeUtils?.getTimeString(i));
    }
  }
  return hours;
});
function order() {
  orderInfo.name = "";
  orderInfo.date = "";
  orderInfo.time = "";
  orderInfo.phone = "";
  orderInfo.people = 1;
  orderInfo.comment = "";
  overPagesStore?.changeOpenOrder(false);
}
</script>
<template>
  <OverContainer
    title="Оформлення замовлення"
    :show-page="overPagesStore?.openOrder"
    @close-container="overPagesStore?.changeOpenOrder(false)"
  >
    <form class="w-full max-w-2xl flex flex-col gap-6">
      <p
        class="custom-global-text-light text-center bg-zinc-900 my-4 px-6 py-3 rounded-xl sm:text-start"
      >
        <i class="fa-solid fa-circle-info mr-2 text-red-500"></i>Ми можемо
        зателефонувати Вам для уточнення інформації
      </p>
      <div class="flex flex-row justify-center items-center flex-wrap gap-2">
        <RadioInput
          v-for="(choice, i) in ['Самовивіз', 'Доставка']"
          :name="'option-' + i"
          :radio-value="choice"
          :model-value="orderInfo?.choice"
          :label="choice"
          @update:model-value="(newValue) => (orderInfo.choice = newValue)"
        />
      </div>
      <FormInput
        name="name"
        label="Ваше ім'я"
        v-slot="slotProps"
        :changed="orderInfo?.name?.length > 0"
        ><input
          type="text"
          id="name"
          name="name"
          v-model="orderInfo.name"
          :class="slotProps?.class"
      /></FormInput>
      <FormInput
        name="phone"
        label="Ваш телефон"
        v-slot="slotProps"
        :changed="orderInfo?.phone?.length > 0"
        ><input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          id="phone"
          name="phone"
          v-model="orderInfo.phone"
          :class="slotProps?.class" /></FormInput
      ><FormInput
        name="date"
        label="Дата"
        v-slot="slotProps"
        :changed="orderInfo?.date?.length > 0"
      >
        <select
          v-model="orderInfo.date"
          id="date"
          name="date"
          :class="slotProps?.class"
        >
          <option disabled value="Дата"></option>
          <option v-for="dateOption in dateOptions">{{ dateOption }}</option>
        </select>
      </FormInput>
      <FormInput
        name="time"
        label="Час"
        v-slot="slotProps"
        :changed="orderInfo?.time?.length > 0"
      >
        <select
          v-model="orderInfo.time"
          id="time"
          name="time"
          :class="slotProps?.class"
        >
          <option disabled value="Час"></option>
          <option v-for="timeOption in timeOptions">{{ timeOption }}</option>
        </select>
      </FormInput>
      <FormInput
        name="people"
        label="Кількість людей"
        v-slot="slotProps"
        :changed="orderInfo?.people > 0"
      >
        <input
          type="number"
          min="1"
          max="99"
          id="people"
          name="people"
          v-model.number="orderInfo.people"
          :class="slotProps?.class"
      /></FormInput>
      <TextArea
        name="comment"
        label="Коментар"
        :model-value="orderInfo?.comment"
        @update:model-value="(newValue) => (orderInfo.comment = newValue)"
        :changed="orderInfo?.comment?.length > 0"
      />
      <GeneralButton type="submit" big @click.stop.prevent="order"
        >Продовжити</GeneralButton
      >
    </form></OverContainer
  >
</template>
<style scoped></style>
