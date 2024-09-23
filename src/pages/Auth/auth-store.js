import { defineStore } from "pinia";
import { useUtils } from "src/plugins/utils";
import { useStorage } from "@vueuse/core";

const { makeRequest } = useUtils();
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      phone: "",
      password: "",
    },
    signedUser: useStorage("user", {
      phone: "",
      name: "",
      role: "",
      club: "",
      token: "",
    }),
    isAuthenticated: false,
  }),
  actions: {
    async login() {
      try {
        const response = await makeRequest("post", "/login", this.user);
        if (response.success) {
          this.isAuthenticated = true;
          this.signedUser = response.data;
          this.router.push("/main");
          clearObjectFields(this.user);
          return true;
        }
      } catch (error) {
        return false;
      } finally {
      }
    },
    async logout() {
      this.isAuthenticated = false;
      this.signedUser = {
        phone: "",
        name: "",
        role: "",
        club: "",
        token: "",
      };
      this.router.push("/login");
    },
  },
});
