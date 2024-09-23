import { defineStore } from "pinia";
import { useUtils } from "src/plugins/utils";
const { makeRequest } = useUtils();
const { clearObjectFields } = useUtils();
export const useExpenseStore = defineStore("expenses", {
  state: () => ({
    expenses: [],
    expense: {
      amount: 0,
      description: "",
    },
    date: null,
    dialog: false,
    dialogType: "create",
  }),
  getters: {
    getMappedExpenses() {
      return this.expenses.map((item, index) => {
        item.idx = index;
        return item;
      });
    },
    getExpensesTotal() {
      return this.expenses.reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
    },
  },
  actions: {
    async getExpenses(date) {
      let [from, to] = date.split(" - ");
      to = to === undefined ? from : to;
      const response = await makeRequest(
        "get",
        `/expenses?from=${from}&to=${to}`
      );
      if (response.success) {
        console.log(response.data);
        this.expenses = response.data;
      }
    },

    async createExpense() {
      const response = await makeRequest("post", `/expenses`, this.expense);
      if (response.success) {
        this.expenses.push(response.data);
        this.dialog = false;
        clearObjectFields(this.expense);
      }
    },

    async updateItem() {
      const response = await makeRequest(
        "put",
        `/expenses/${this.expense._id}`,
        this.expense
      );
      if (response.success) {
        this.expenses[this.expense.idx] = response.data;
        this.dialog = false;
        clearObjectFields(this.expense);
      }
    },

    async deleteItem(expense) {
      const response = await makeRequest(
        "delete",
        `/expenses/${this.expense._id}`
      );
      if (response.success) {
        this.expenses.splice(this.expense.idx, 1);
      }
    },
  },
});
