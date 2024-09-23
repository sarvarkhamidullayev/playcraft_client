import { defineStore } from "pinia";
import { useUtils } from "src/plugins/utils";
import { useStorage } from "@vueuse/core";
import { Dialog } from "quasar";
const { makeRequest } = useUtils();
const endpoint = "/game";
const objFields = {
  title: "",
  price: null,
};
export const useGameStore = defineStore("game", {
  state: () => ({
    dialog: false,
    dialogType: "create",
    game: { ...objFields },
    games: useStorage("games", []),
  }),
  getters: {
    allGames() {
      return this.games.map((game, idx) => {
        return {
          ...game,
          idx: idx,
        };
      });
    },
    mappedForSelect() {
      return this.games.map((game) => {
        return {
          label: game.title,
          value: game._id,
        };
      });
    },
  },
  actions: {
    openDialog(type, item) {
      if (type === "update") {
        this.game = { ...item };
      }
      this.dialogType = type;
      this.dialog = true;
    },
    async createItem() {
      const response = await makeRequest("post", endpoint, this.game);
      if (response.success) {
        this.dialog = false;
        this.games.push(response.data);
        this.game = { ...objFields };
      }
    },
    async updateItem() {
      const response = await makeRequest(
        "put",
        `${endpoint}/${this.game._id}`,
        this.game
      );
      if (response.success) {
        this.games[this.game.idx] = response.data;
        this.dialog = false;
        this.game = { ...objFields };
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
          this.games.splice(idx, 1);
          this.dialog = false;
        }
      });
    },
  },
});
