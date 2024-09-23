const { useUniversalStore } = require("src/stores/universal-store");

async function getData(url, options = {}) {
  try {
    const response = await fetch(url, options).then((res) => res.json());
    return { success: true, data: response };
  } catch (error) {
    console.error(error);
    if (
      error.request &&
      error.request.status !== 401 &&
      error.request.status !== 404 &&
      error.request.status !== 500 &&
      error.request.status !== 409
    ) {
      console.log(error.request);
      return { success: false, data: error.request };
    }
    if (error.response.status === 401) {
      useAuthStore().logout();
      return { success: false, data: error.response };
    }

    return { success: false, data: error.response };
  }
}

self.onmessage = async function (event) {
  const { url, options } = event.data;
  const allgames = await getData(url + "/game", options);
  const allrooms = await getData(url + "/room", options);
  const allproducts = await getData(url + "/product", options);

  self.postMessage({ allgames, allproducts, allrooms });
};
