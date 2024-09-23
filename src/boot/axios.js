import { boot } from "quasar/wrappers";
import axios from "axios";
import { useAuthStore } from "src/pages/Auth/auth-store";

// const api = axios.create({ baseURL: "http://zostore.uz:5656/api" });
const api = axios.create({ baseURL: "http://localhost:5656/api" });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

api.interceptors.request.use((config) => {
  const token = useAuthStore().signedUser.token;
  const club = useAuthStore().signedUser.club._id;
  if (club) {
    config.headers.Club = club;
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
