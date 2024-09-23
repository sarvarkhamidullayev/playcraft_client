import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Dialog } from "quasar";
import { upsertItem } from "src/plugins/localDB";
import { useUtils } from "src/plugins/utils";
import { useProductStore } from "./product";
const endpoint = "/room";
const objFields = {
  title: "",
  game: "",
};
const orderFields = {
  room: "",
  game: {
    title: "",
    price: 0,
    duration: 0,
    totalGamePrice: 0,
  },
  products: [],
  payment: {
    cash: 0,
    card: 0,
  },
  total: 0,
};

const {
  makeRequest,
  formatTime,
  getNumber,
  getCurrentDateAndTimeISO,
  getMinutesDifference,
} = useUtils();

export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: useStorage("rooms", []),
    room: { ...objFields },
    dialogType: "create",
    dialog: false,
    filter: "",
    time: 0,
    order: {
      ...orderFields,
    },
    paymentDlg: false,
    // intervalId: null,
    // duration: 0,
  }),
  getters: {
    allRooms() {
      this.filter = this.filter === null ? "" : this.filter;
      return this.rooms
        .filter((room) =>
          room.game.title.toLowerCase().includes(this.filter.toLowerCase())
        )
        .map((room, idx) => ({
          ...room,
          idx,
          game: {
            label: room.game.title,
            value: room.game._id,
            price: room.game.price,
          },
        }));
    },
    allRoomsToHome() {
      const filterText = this.filter ? this.filter.toLowerCase() : "";
      return this.rooms
        .map((room, idx) => {
          const isRoomOccupied = room.status !== "free";
          const minutesDifference = isRoomOccupied
            ? getMinutesDifference(room.startTime)
            : 0;
          const duration = isRoomOccupied
            ? (minutesDifference / 1).toFixed(2)
            : 0;
          const totalGameSum = isRoomOccupied
            ? (minutesDifference / 60) * room.game.price
            : 0;
          const totalProductsSum = room.products.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );

          // Calculate the total sum
          const totalSum = totalGameSum + totalProductsSum;

          // Check if room matches filter
          const matchesFilter = room.game.title
            .toLowerCase()
            .includes(filterText);

          if (!matchesFilter) return null;

          return {
            ...room,
            idx,
            time: this.time,
            showTime: isRoomOccupied ? room.startTime : "-- : --",
            duration,
            totalGameSum,
            totalProductsSum,
            totalSum, // Adding the total sum
            game: {
              label: room.game.title,
              value: room.game._id,
              price: room.game.price,
            },
          };
        })
        .filter((room) => room !== null); // Filter out any null rooms (that did not match the filter)
    },
    getRoomsGames() {
      const titles = this.rooms.map((item) => item.game.title);
      return titles.filter(
        (title, index, self) => self.indexOf(title) === index
      );
    },
  },
  actions: {
    filterProducts(event) {
      const products = useProductStore().products;
      Dialog.create({
        title: "Mahsulot sonini kiritish",
        prompt: {
          model: "",
          type: "number",
        },
        cancel: true,
        persistent: true,
      })
        .onOk((data) => {
          const res = this.rooms[this.room.idx].products.findIndex(
            (item) => item._id === event._id
          );
          if (getNumber(data) > 0) {
            const product = {
              title: event.title,
              price: event.price,
              incomePrice: event.incomePrice,
              category: event.category,
              quantity: getNumber(data),
              _id: event._id,
              idx: this.rooms[this.room.idx].products.length,
            };
            if (res === -1) {
              this.rooms[this.room.idx].products.push(product);
            } else {
              this.rooms[this.room.idx].products[res].quantity +=
                getNumber(data);
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
    openDialog(type, item) {
      if (type === "update") {
        this.room = { ...item };
      }
      this.dialogType = type;
      this.dialog = true;
    },
    async createItem() {
      const response = await makeRequest("post", endpoint, this.room);
      if (response.success) {
        this.dialog = false;
        this.rooms.push(response.data);
        this.room = { ...objFields };
      }
    },

    async updateItem() {
      const response = await makeRequest(
        "put",
        `${endpoint}/${this.room._id}`,
        this.room
      );
      if (response.success) {
        this.rooms[this.room.idx] = response.data;
        this.dialog = false;
        this.room = { ...objFields };
      }
    },
    async deleteItem(itemID, idx) {
      Dialog.create({
        title: "O'chirish",
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
        const response = await makeRequest("delete", `${endpoint}/${itemID}`);
        if (response.success) {
          this.rooms.splice(idx, 1);
          this.dialog = false;
        }
      });
    },

    // open room status
    async openRoom(roomId) {
      this.rooms[roomId].startTime = getCurrentDateAndTimeISO();
      this.rooms[roomId].status = "vip";
    },

    async closeRoom() {
      await upsertItem("order", JSON.parse(JSON.stringify(this.order)));
      this.rooms[this.order.idx].status = "free";
      this.rooms[this.order.idx].startTime = null;
      this.rooms[this.order.idx].products = [];
      this.order = { ...orderFields };
      this.paymentDlg = false;
    },

    async getOrders(roomID, products) {
      const response = await makeRequest(
        "patch",
        `${endpoint}/order/${roomID}`,
        products
      );
      if (response.success) {
        const index = this.rooms.findIndex((item) => item._id === roomID);
        if (index !== -1) {
          this.rooms[index] = response.data;
          this.roomDetails.showTime === "booked"
            ? formatTime(this.rooms[index].startTime)
            : "-";
        }
        this.roomDetails = response.data;
        this.roomDetails.showTime =
          response.data.status !== "free"
            ? formatTime(response.data.startTime)
            : "-";
        return true;
      }
      return false;
    },

    async setTimer(roomId, money) {
      const response = await makeRequest(
        "patch",
        `${endpoint}/open-prepay/${roomId}`,
        { money: money }
      );
      if (response.success) {
        this.roomDetails = response.data;
        this.roomDetails.showTime =
          response.data.status !== "free"
            ? formatTime(response.data.startTime)
            : "-";
      }
    },
    async deleteProductFromRoom(product) {
      const response = await makeRequest(
        "patch",
        `${endpoint}/delete-product/${this.roomDetails._id}`,
        { id: product }
      );
      if (response.success) {
        const index = this.rooms.findIndex(
          (item) => item._id === this.roomDetails._id
        );
        if (index !== -1) {
          this.rooms[index] = response.data;
        }
        this.roomDetails = response.data;
        this.roomDetails.showTime =
          response.data.status !== "free"
            ? formatTime(response.data.startTime)
            : "-";
        return true;
      }
      return false;
    },
  },
});
