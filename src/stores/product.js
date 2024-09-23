import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Dialog } from "quasar";
import { useUtils } from "src/plugins/utils";
const endpoint = "/product";
const objFields = {
  title: "",
  incomePrice: "",
  price: "",
  category: "",
};

const { makeRequest } = useUtils();

export const useProductStore = defineStore("product", {
  state: () => ({
    dialog: false,
    dialogType: "create",
    filter: "",
    product: { ...objFields },
    products: useStorage("products", []),
  }),
  getters: {
    getMappedProducts() {
      this.filter = this.filter === null ? "" : this.filter;
      return this.products
        .filter((product) =>
          product.title.toLowerCase().includes(this.filter.toLowerCase())
        )
        .map((product, idx) => ({
          label: product.title,
          ...product,
          idx,
        }));
    },
    getDrinks() {
      return this.products.filter(
        (product) => product.category === "Ichimliklar"
      );
    },
    getFoods() {
      return this.products.filter((product) => product.category === "Taomlar");
    },
    getOthers() {
      return this.products.filter(
        (product) => product.category === "Boshqalar"
      );
    },
  },
  actions: {
    openDialog(type, item) {
      if (type === "update") {
        this.product = { ...item };
      }
      this.dialogType = type;
      this.dialog = true;
    },

    async createItem() {
      const response = await makeRequest("post", endpoint, this.product);
      if (response.success) {
        this.dialog = false;
        this.products.push(response.data);
        this.product = { ...objFields };
      }
    },
    async updateItem() {
      const response = await makeRequest(
        "put",
        `${endpoint}/${this.product._id}`,
        this.product
      );
      if (response.success) {
        this.products[this.product.idx] = response.data;
        this.dialog = false;
        this.product = { ...objFields };
      }
    },

    async deleteItem(id, idx) {
      Dialog.create({
        title: "O'chirish?",
        message: "Rostdan ham o'chirmoqchimisz?",
        cancel: true,
        persistent: true,
        ok: {
          label: "Ha, albatta",
          color: "red-5",
          noCaps: true,
          unelevated: true,
        },
        cancel: {
          label: "Bekor qilish",
          color: "primary",
          noCaps: true,
          flat: true,
        },
      }).onOk(async () => {
        const response = await makeRequest("delete", `${endpoint}/${id}`);
        if (response.success) {
          this.products.splice(idx, 1);
          this.dialog = false;
        }
      });
    },
  },
});
