import { defineStore } from "pinia";
import { useUtils } from "src/plugins/utils";
const { makeRequest, getNumber, convertMinutesToHours } = useUtils();
export const useReportsStore = defineStore("reports", {
  state: () => ({
    playStations: [],
    products: [],
    expenses: [],
    totals: [],
    profits: [],
  }),
  getters: {},
  actions: {
    async getReports(date) {
      let [from, to] = date.split(" - ");
      to = to === undefined ? from : to;
      const response = await makeRequest(
        "get",
        `/reports?from=${from}&to=${to}`
      );
      if (response.success) {
        const { playStations, products, expenses, totals, profits } =
          response.data;
        this.playStations = playStations;
        this.products = products;
        this.expenses = expenses;
        this.totals = totals;
        this.profits = profits;
        console.log(response.data);
        return;
      }
    },
  },
});
