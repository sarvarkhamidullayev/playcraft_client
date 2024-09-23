import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Notify } from "quasar";
import { Dialog } from "quasar";
import { useAuthStore } from "src/pages/Auth/auth-store";
import { useUtils } from "src/plugins/utils";
const endpoint = "/income";
const { getNumber, makeRequest } = useUtils();
const objFields = {
  addedBy: "",
  products: [],
};
export const useIncomeStore = defineStore("income", {
  state: () => ({
    incomes: useStorage("incomes", []),
    income: {
      ...objFields,
    },
    filter: "",
    dialog: false,
    product: {
      _id: "",
      title: "",
      incomePrice: "",
      price: "",
      quantity: "",
    },
  }),
  getters: {
    allIncomes() {
      // return  items with  idx, totalProductsPrice and totalProductsQuantity
      return this.incomes.map((income, index) => {
        income.idx = index;
        income.totalProductsPrice = this.incomes[index].products.reduce(
          (acc, item) => {
            return acc + item.price * item.quantity;
          },
          0
        );
        income.totalProductsQuantity = this.incomes[index].products.reduce(
          (acc, item) => {
            return acc + item.quantity;
          },
          0
        );
        return income;
      });
    },
  },
  actions: {
    openDialog(item) {
      if (item) {
        this.product = { ...item };
      }
      this.dialog = true;
    },
    filterProducts(event) {
      const res = this.income.products.findIndex(
        (item) => item._id === event._id
      );
      Dialog.create({
        title: "Mahsulot sonini kiritish",
        message:
          res !== -1
            ? "Bu mahsulotdan savatda " +
              this.income.products[res].quantity +
              " dona mavjud. Rostdan ham qoshmoqchimisiz?"
            : "Mahsulot qo'shmoqchimisiz?",
        prompt: {
          model: "",
          type: "number",
        },
        cancel: true,
        persistent: true,
      })
        .onOk((data) => {
          if (getNumber(data) > 0) {
            const product = {
              title: event.title,
              price: event.price,
              incomePrice: event.incomePrice,
              category: event.category,
              quantity: getNumber(data),
              _id: event._id,
              idx: this.income.products.length,
            };
            if (res === -1) {
              this.income.products.push(product);
            } else {
              this.income.products[res].quantity += getNumber(data);
            }
            this.filter = "";
          } else {
            this.filter = "";
            Notify.create({
              type: "negative",
              message: "Mahsulot soni kiritilmadi",
            });
          }
        })
        .onCancel(() => {
          this.filter = "";
        });
    },
    async getIncomes(date) {
      let [from, to] = date.split(" - ");
      to = to === undefined ? from : to;
      const response = await makeRequest(
        "get",
        `/income?from=${from}&to=${to}`
      );
      if (response.success) {
        this.incomes = response.data;
        console.log(this.incomes);
        return;
      }
    },

    async createItem() {
      console.log(this.income);

      if (this.income.products.length > 0) {
        const totalProductsPrice = this.income.products.reduce((acc, item) => {
          return acc + getNumber(item.incomePrice) * getNumber(item.quantity);
        }, 0);
        const totalProductsQuantity = this.income.products.reduce(
          (acc, item) => {
            return acc + getNumber(item.quantity);
          },
          0
        );
        Dialog.create({
          title: "Kirimni yakunlash",
          cancel: {
            label: "Bekor qilish",
            noCaps: true,
            flat: true,
          },
          ok: {
            label: "Yakunlash",
            color: "primary",
            noCaps: true,
          },
          message:
            "Savatda " +
            totalProductsQuantity +
            " dona va umumiy summa " +
            totalProductsPrice +
            " so'm. Rostdan ham qo'shmoqchimisiz?",
        }).onOk(async () => {
          const { signedUser } = useAuthStore();
          this.income.addedBy = signedUser.name;
          const response = await makeRequest("post", endpoint, this.income);
          if (response.success) {
            this.dialog = false;
            this.incomes.push(response.data);
            this.income = { ...objFields };
            this.router.go(-1);
            this.income.products = [];
          }
        });
      } else {
        Notify.create({
          type: "negative",
          message: "Savat bo'sh, mahsulot qo'shmoqchimisiz?",
        });
      }
    },
    deleteFromCart(idx) {
      this.income.products.splice(idx, 1);
    },
  },
});
