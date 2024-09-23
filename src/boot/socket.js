import { boot } from "quasar/wrappers";
import SocketIO from "src/plugins/socketIO";
export default boot(({ app }) => {
  app.use(SocketIO, {
    connection: "http://localhost:5656",
    // connection: "http://zostore.uz:5656",
    options: {
      transports: ["websocket"],
    },
  });
});
