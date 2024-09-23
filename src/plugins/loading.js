import { Loading } from "quasar";
const showLoading = () => {
  Loading.show({
    message: "Илтимос кутиб туринг ...",
  });
};

const hideLoading = () => {
  Loading.hide();
};
export function useLoading() {
  return {
    showLoading,
    hideLoading,
  };
}
