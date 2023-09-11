import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);
  function changeLoading(val) {
    loading.value = val;
  }
  return {
    loading,
    changeLoading,
  };
});
