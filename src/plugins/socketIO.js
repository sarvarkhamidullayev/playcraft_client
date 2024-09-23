import { io } from "socket.io-client";
import { useUniversalStore } from "src/stores/universal-store";

export default {
  install: (app, { connection, options }) => {
    const socket = io(connection, options);

    socket.on("connect_error", function () {
      useUniversalStore().isOnline = false;
    });

    socket.on("connect", async function () {
      useUniversalStore().isOnline = true;
    });

    app.config.globalProperties.$socket = socket;
    app.provide("socket", socket);
  },
};
