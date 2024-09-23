import { route } from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { useAuthStore } from "../pages/Auth/auth-store"; // Ensure this import is correct
import routes from "./routes";

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Registering the beforeEach navigation guard
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta.authRequired);

    if (requiresAuth && !authStore.signedUser.token) {
      next("/login"); // Redirect to login if authentication is required but user is not authenticated
    } else {
      const userRole = authStore.signedUser.role;
      if (to.path === "/home" && userRole === "user") {
        console.log(
          "User role detected, redirecting to /home or another valid route for users"
        );
        next("/reports"); // Redirect user to another valid route instead of "/home" if they're not supposed to access it
      } else {
        next(); // Allow navigation to proceed as normal
      }
    }
  });

  return Router;
});
