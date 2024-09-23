import { defineStore } from "pinia";
import { useUtils } from "src/plugins/utils";
const { makeRequest, getNumber, convertMinutesToHours } = useUtils();
export const useStatisticStore = defineStore("statistic", {
  state: () => ({
    orders: [],
    expenses: [],
    yearlyOrders: [],
    topProducts: [],
  }),
  getters: {
    getMappedOrders() {
      return this.orders.map((order, index) => {
        order.idx = index;
        return order;
      });
    },
    getTotalSumOfOrders() {
      let total = {
        title: "Umumiy summa",
        amount: 0,
        icon: "attach_money",
        quantity: this.orders.length,
        measure: "dona",
      };
      let totalPSSum = {
        title: "Playstation",
        amount: 0,
        icon: "sports_esports",
        quantity: 0,
        measure: "daqiqa",
      };
      let totalProductPrice = {
        title: "Mahsulotlar summasi",
        amount: 0,
        icon: "inventory_2",
        quantity: 0,
        measure: "dona",
      };
      this.orders.forEach((order) => {
        // calculate total
        total.amount += order.total;

        // calculate total play station price
        totalPSSum.amount += order.playStation.totalPSPrice;
        totalPSSum.quantity += getNumber(order.playStation.duration);
        console.log(totalPSSum.quantity);
        // calculate total product price
        totalProductPrice.quantity += order.products.length;
        totalProductPrice.amount += order.products.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
      });

      totalPSSum.quantity = convertMinutesToHours(totalPSSum.quantity);
      return {
        totalPSSum,
        totalProductPrice,
        total,
      };
    },
  },
  actions: {
    async getStatistics(date) {
      let [from, to] = date.split(" - ");
      to = to === undefined ? from : to;
      const response = await makeRequest(
        "get",
        `/statistics?from=${from}&to=${to}`
      );
      if (response.success) {
        this.orders = response.data.orders;
        this.expenses = response.data.expenses;
        this.yearlyOrders = response.data.yearlyOrders;
        this.topProducts = response.data.topProducts;
        return;
      }
    },
  },
});
