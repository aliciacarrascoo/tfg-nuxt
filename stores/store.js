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

export const useAlertStore = defineStore({
  id: "alert-store",
  state: () => ({
    alertQueue: []
  }),
  actions: {
    addAlert(text,title,type){
      const alert = { text, title, type, id: text + title + type};
      this.alertQueue.push(alert);
      return alert;
    },
    removeAlert(alert){
      this.alertQueue = this.alertQueue.filter((element)=>{
        return element.id !== alert.id; 
      });
    },
    addTemporaryAlert(text,title,type){
      const alert = this.addAlert(text,title,type);
      setInterval(() => this.removeAlert(alert), 10000);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot));
}
