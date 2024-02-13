import { Product } from "../types";
import axiosClient from "./axios";

//add try catch
const getProducts = async () => {
  const response = await axiosClient.get<Product[]>("/Products");
  const products = response.data.map((product: Product) => ({
    ...product,
    quantitySelected: 0,
  }));
  return products;
};

export default getProducts;
