<script setup>
import { reactive, computed } from "vue";
import { useOverPagesStore } from "../stores/useOverPagesStore";
import dateAndTimeUtils from "../utils/dateAndTimeUtils";
import OverContainer from "../OverContainer.vue";
import GeneralButton from "../GeneralButton.vue";
import FormInput from "../formComponents/FormInput.vue";
import TextArea from "../formComponents/TextArea.vue";
const overPagesStore = useOverPagesStore();
const reserveInfo = reactive({
  name: "",
  date: "",
  time: "",
  phone: "",
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
  const chosenDate = dateAndTimeUtils?.getDateDay(reserveInfo?.date);
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
function reserveTable() {
  reserveInfo.name = "";
  reserveInfo.date = "";
  reserveInfo.time = "";
  reserveInfo.phone = "";
  reserveInfo.comment = "";
  overPagesStore?.changeOpenReserve(false);
}
</script>
<template>
  <OverContainer
    title="Забронювати стіл"
    :show-page="overPagesStore?.openReserve"
    @close-container="overPagesStore?.changeOpenReserve(false)"
  >
    <form class="w-full max-w-2xl flex flex-col gap-6">
      <p
        class="custom-global-text-light text-center bg-zinc-900 my-4 px-6 py-3 rounded-xl sm:text-start"
      >
        <i class="fa-solid fa-circle-info mr-2 text-red-500"></i>Заповніть форму
        і очікуйте на дзвінок для підтвердження
      </p>
      <FormInput
        name="date"
        label="Дата"
        v-slot="slotProps"
        :changed="reserveInfo?.date?.length > 0"
      >
        <select
          v-model="reserveInfo.date"
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
        :changed="reserveInfo?.time?.length > 0"
      >
        <select
          v-model="reserveInfo.time"
          id="time"
          name="time"
          :class="slotProps?.class"
        >
          <option disabled value="Час"></option>
          <option v-for="timeOption in timeOptions">{{ timeOption }}</option>
        </select>
      </FormInput>
      <FormInput
        name="name"
        label="Ваше ім'я"
        v-slot="slotProps"
        :changed="reserveInfo?.name?.length > 0"
        ><input
          type="text"
          id="name"
          name="name"
          v-model="reserveInfo.name"
          :class="slotProps?.class"
      /></FormInput>
      <FormInput
        name="phone"
        label="Ваш телефон"
        v-slot="slotProps"
        :changed="reserveInfo?.phone?.length > 0"
        ><input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          id="phone"
          name="phone"
          v-model="reserveInfo.phone"
          :class="slotProps?.class"
      /></FormInput>
      <TextArea
        name="comment"
        label="Коментар"
        :model-value="reserveInfo?.comment"
        @update:model-value="(newValue) => (reserveInfo.comment = newValue)"
        :changed="reserveInfo?.comment?.length > 0"
      />
      <GeneralButton type="submit" big @click.stop.prevent="reserveTable"
        >Забронювати</GeneralButton
      >
    </form></OverContainer
  >
</template>
<style scoped></style>
