export default {
  startHour: 11,
  endHour: 22,
  getDateString(date) {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const dayString = day < 10 ? "0" + day : day;
    const monthString = month < 10 ? "0" + month : month;
    return dayString + "." + monthString;
  },
  addDaysToDate(date, days) {
    return date + 3600 * 1000 * 24 * days;
  },
  getDateDay(date) {
    return parseInt(date?.split(".")[0]);
  },
  getTimeString(time) {
    return Number.isInteger(time) ? time + ":00" : parseInt(time) + ":30";
  },
};
