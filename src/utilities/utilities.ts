import React from "react";
import { DiscountCoupon, Product } from "../types";

export const calculateShipping = (price: number) => {
  if (price < 20) {
    return 7;
  } else if (price >= 20 && price <= 40) {
    return 5;
  } else {
    return 0;
  }
};

export const getDiscountType = (): DiscountCoupon => {
  const randomChance = Math.floor(Math.random() * 4) + 1;

  if (randomChance === 1) {
    return {
      code: "freeShipping!",
      description: "Free Shipping",
      type: 1,
    };
  } else if (randomChance === 2) {
    return {
      code: "APPL10",
      description: "10% on all Apple Products",
      type: 2,
      discount: 0.1,
      supplierId: 1,
    };
  } else if (randomChance === 3) {
    return {
      code: "AUDIO15",
      description: "15% on all Audio Products",
      type: 3,
      discount: 0.15,
      category: "audio",
    };
  } else {
    return {
      code: "ELEC25",
      description: "25% on all Electronic Products",
      type: 3,
      discount: 0.25,
      category: "electronic",
    };
  }
};

// these 4 functions can be refactored into less to utilize core reuse
export const sortByNameAsc = (
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) =>
    a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
  );
  setProducts(sortedProducts);
};

export const sortByNameDesc = (
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) =>
    b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase())
  );
  setProducts(sortedProducts);
};

export const sortByPriceAsc = (
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => a.price - b.price);
  setProducts(sortedProducts);
};

export const sortByPriceDesc = (
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => b.price - a.price);
  setProducts(sortedProducts);
};
