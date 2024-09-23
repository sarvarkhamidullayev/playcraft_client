import money from "v-money";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.use(money);
});
