import { Notify } from "quasar";

const positive = (msg) => {
  Notify.create({
    type: "positive",
    message: msg,
    timeout: 2000,
    badgeColor: "transparent",
  });
};

const negative = (msg) => {
  Notify.create({
    type: "negative",
    message: msg,
    timeout: 2000,
    badgeColor: "transparent",
  });
};

export function useNotify() {
  return {
    positive,
    negative,
  };
}
