import { acceptHMRUpdate } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading-store",
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    triggerLoading() {
      this.isLoading = !this.isLoading;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot));
}
