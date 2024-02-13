import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://man-shopping-cart-test.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosClient;
