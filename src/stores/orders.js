import { defineStore } from "pinia";
import { useUtils } from "src/plugins/utils";
const { makeRequest } = useUtils();
export const useOrderStore = defineStore("orders", {
  state: () => ({
    orders: [],
  }),
  getters: {
    getMappedOrders() {
      return this.orders.map((order, index) => {
        order.idx = index;
        return order;
      });
    },
    getOrdersTotal() {
      return this.orders.reduce((acc, item) => {
        return acc + item.total;
      }, 0);
    },
  },
  actions: {
    async getOrders(date) {
      let [from, to] = date.split(" - ");
      to = to === undefined ? from : to;
      const response = await makeRequest(
        "get",
        `/orders?from=${from}&to=${to}`
      );
      if (response.success) {
        this.orders = response.data;
      }
    },
  },
});
