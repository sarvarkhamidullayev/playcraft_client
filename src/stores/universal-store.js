import { defineStore } from "pinia";
import moment from "moment";
import { useStorage } from "@vueuse/core";

export const useUniversalStore = defineStore("universal", {
  state: () => ({
    leftDrawer: false,
    date: null,
    isOnline: useStorage("isOnline", false),
  }),
  getters: {
    parsedDate() {
      if (this.date === null) {
        return moment(new Date()).format("DD.MM.YYYY");
      }
      if (typeof this.date === "object") {
        return `${this.date.from} - ${this.date.to}`;
      }
      return this.date;
    },
  },
  actions: {
    toggleLeftDrawer() {
      this.leftDrawer = !this.leftDrawer;
    },
  },
});
