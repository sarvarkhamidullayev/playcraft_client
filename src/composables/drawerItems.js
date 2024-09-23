export function getDrawerItems() {
  return [
    {
      icon: "home",
      label: "Asosiy oyna",
      to: "/home",
      children: [],
      role: "admin",
    },
    {
      icon: "sports_esports",
      label: "O'yinlar",
      to: "/games",
      children: [],
      role: "admin",
    },
    {
      icon: "meeting_room",
      label: "Xonalar",
      to: "/room",
      children: [],
      role: "admin",
    },
    {
      icon: "warehouse",
      label: "Kirim",
      to: "/income",
      children: [],
      role: "admin",
    },
    {
      icon: "inventory_2",
      label: "Mahsulotlar",
      to: "/products",
      children: [],
      role: "admin",
    },
    {
      icon: "list_alt",
      label: "Buyurtmalar",
      to: "/orders",
      children: [],
      role: "admin",
    },
    {
      icon: "monetization_on",
      label: "Xarajatlar",
      to: "/expenses",
      children: [],
      role: "admin",
    },

    {
      icon: "query_stats",
      label: "Hisobotlar",
      to: "/reports",
      children: [],
      role: "admin",
    },
    {
      icon: "bar_chart",
      label: "Statistika",
      to: "/statistic",
      children: [],
      role: "admin",
    },
    {
      icon: "monetization_on",
      label: "Xarajatlar",
      to: "/expenses",
      children: [],
      role: "user",
    },
    {
      icon: "account_circle",
      label: "Shaxsiy hisob",
      to: "/account",
      children: [],
      role: "user",
    },
    {
      icon: "account_circle",
      label: "Shaxsiy hisob",
      to: "/account",
      children: [],
      role: "admin",
    },
  ];
}
