import { defineStore } from "pinia";

export const useCustomStore = defineStore("CustomStore", {
  state: () => ({
    someVar: "SomeVal",
  }),
  getters: {},
  actions: {},
});
