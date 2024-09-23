import { useUtils } from "src/plugins/utils";

const { formatNumber, formatMinutesToTime, formatDate, formatTime } =
  useUtils();
export function tableCols() {
  return {
    games: [
      {
        name: "index",
        align: "left",
        label: "No",
        field: (row) => row.idx + 1,
      },
      {
        name: "title",
        align: "center",
        label: "Nomi",
        field: "title",
        sortable: true,
      },
      {
        name: "price",
        align: "center",
        label: "Narxi",
        field: (row) => formatNumber(row.price) + " so'm",
        sortable: true,
      },
      {
        name: "club",
        align: "center",
        label: "Klubi",
        field: (row) => row.club.title,
      },
      {
        name: "actions",
        align: "center",
      },
    ],
    rooms: [
      {
        name: "index",
        align: "left",
        label: "No",
        field: (row) => row.idx + 1,
      },
      {
        name: "title",
        align: "center",
        label: "Nomi",
        field: (row) => row.title + " - xona",
        sortable: true,
      },
      {
        name: "game",
        align: "center",
        label: "O'yin",
        field: (row) => row.game.label,
        sortable: true,
      },
      {
        name: "price",
        align: "center",
        label: "O'yin narxi",
        field: (row) => formatNumber(row.game.price) + " so'm",
        sortable: true,
      },

      {
        name: "actions",
        align: "center",
      },
    ],
    roomsOnHome: [
      {
        name: "title",
        align: "center",
        label: "Nomi",
        field: (row) => row.title + " - xona",
        sortable: true,
      },
      {
        name: "game",
        align: "center",
        label: "O'yin",
        field: (row) => row.game.label,
        sortable: true,
      },
      {
        name: "time",
        align: "center",
        label: "Vaqt",
        field: (row) =>
          row.status !== "free" ? formatTime(row.startTime) : "-- : --",
      },
      {
        name: "duration",
        align: "center",
        label: "O'tkan  vaqt",

        field: (row) => formatMinutesToTime(row.duration),
      },
      {
        name: "gamePrice",
        align: "center",
        label: "O'yin summasi",
        field: (row) => formatNumber(row.totalGameSum.toFixed(0)) + " so'm",
        sortable: true,
      },
      {
        name: "total",
        align: "center",
        label: "Umumiy summa",
        field: (row) => formatNumber(row.totalSum.toFixed(0)) + " so'm",
        sortable: true,
      },
      {
        name: "status",
        align: "center",
        label: "Holati",
        field: (row) => row.status,
        sortable: true,
      },

      {
        name: "actions",
        align: "center",
      },
    ],
    products: [
      {
        name: "index",
        align: "left",
        label: "No",
        field: (row) => row.idx + 1,
      },
      {
        name: "title",
        align: "center",
        label: "Nomi",
        field: (row) => row.title,
        sortable: true,
      },
      {
        name: "category",
        align: "center",
        label: "Bo'limi",
        field: (row) => row.category,
        sortable: true,
      },
      {
        name: "price",
        align: "center",
        label: "Kelish narxi",
        field: (row) => formatNumber(row.incomePrice) + " so'm",
        sortable: true,
      },
      {
        name: "price",
        align: "center",
        label: "Sotilish narxi",
        field: (row) => formatNumber(row.price) + " so'm",
        sortable: true,
      },
      {
        name: "quantity",
        align: "center",
        label: "Soni",
        field: (row) => row.quantity,
        sortable: true,
      },

      {
        name: "actions",
        align: "center",
      },
    ],
    incomes: [
      {
        name: "index",
        align: "left",
        label: "No",
        field: (row) => row.idx + 1,
      },
      {
        name: "addedBy",
        align: "center",
        label: "Kim tomondan qo'shilgan",
        field: (row) => row.addedBy,
        sortable: true,
      },
      {
        name: "totalProducts",
        align: "center",
        label: "Mahsulotlar soni",
        field: (row) => row.totalProductsQuantity,
        sortable: true,
      },
      {
        name: "totalPrice",
        align: "center",
        label: "Umumiy summa",
        field: (row) => formatNumber(row.totalProductsPrice) + " so'm",
        sortable: true,
      },
      {
        name: "date",
        align: "center",
        label: "Sana",
        field: (row) => formatDate(row.date),
      },
      {
        name: "actions",
        align: "center",
      },
    ],
    incomeProducts: [
      {
        name: "index",
        align: "left",
        label: "No",
        field: (row) => row.idx + 1,
      },
      { name: "title", align: "center", label: "Nomi", field: "title" },
      {
        name: "price",
        align: "center",
        label: "Kelish narxi",
        field: (row) => formatNumber(row.incomePrice) + " so'm",
        sortable: true,
      },
      {
        name: "price",
        align: "center",
        label: "Sotilish narxi",
        field: (row) => formatNumber(row.price) + " so'm",
        sortable: true,
      },
      {
        name: "quantity",
        align: "center",
        label: "Soni",
        field: (row) => row.quantity,
        sortable: true,
      },
      {
        name: "actions",
        align: "center",
      },
    ],
    homeProducts: [
      {
        name: "index",
        align: "left",
        label: "No",
        field: (row) => row.idx + 1,
      },
      { name: "title", align: "center", label: "Nomi", field: "title" },
      {
        name: "price",
        align: "center",
        label: "Narxi",
        field: (row) => formatNumber(row.price) + " so'm",
        sortable: true,
      },
      {
        name: "quantity",
        align: "center",
        label: "Soni",
        field: (row) => row.quantity,
        sortable: true,
      },
      {
        name: "actions",
        align: "center",
      },
    ],
  };
}
