const routes = [
  {
    path: "/",
    redirect: "/main",
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/login",
    component: () => import("src/pages/Auth/AuthPage.vue"),
  },
  {
    path: "/main",
    component: () => import("../layouts/MainLayout.vue"),
    meta: {
      authRequired: true,
    },
    children: [
      { path: "", redirect: "/home" },
      {
        path: "/home",
        component: () => import("src/pages/Home/IndexPage.vue"),
      },
      {
        path: "/room",
        component: () => import("src/pages/Rooms/IndexPage.vue"),
      },
      {
        path: "/room-cart/:idx",
        component: () => import("src/pages/Home/DetailsPage.vue"),
      },
      {
        path: "/games",
        component: () => import("src/pages/Games/IndexPage.vue"),
      },
      {
        path: "/products",
        component: () => import("src/pages/Product/IndexPage.vue"),
      },
      {
        path: "/income",
        component: () => import("src/pages/Income/IndexPage.vue"),
      },
      {
        path: "/new-income",
        component: () => import("src/pages/Income/IncomePage.vue"),
      },
      {
        path: "/orders",
        component: () => import("src/pages/Orders/IndexPage.vue"),
      },
      {
        path: "/room-details",
        component: () => import("src/pages/Home/DetailsPage.vue"),
      },
      {
        path: "/account",
        component: () => import("src/pages/Account/IndexPage.vue"),
      },
      {
        path: "/statistic",
        component: () => import("src/pages/Statistics/IndexPage.vue"),
      },
      {
        path: "/reports",
        component: () => import("src/pages/Reports/IndexPage.vue"),
      },
      {
        path: "/expenses",
        component: () => import("src/pages/Expenses/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/not-found",
    component: () => import("src/pages/ErrorNotFound.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/not-found",
  },
];

export default routes;
