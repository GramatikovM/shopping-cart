export type Product = {
  id: number;
  quantitySelected: number;
  name: string;
  imageUrl: string;
  price: number;
  supplierId?: number;
  wholesalePrice?: number;
  categories: Array<string>;
};

export type DiscountCoupon = {
  code: "freeShipping!" | "APPL10" | "AUDIO15" | "ELEC25";
  description: string;
  type?: number;
  discount?: number;
  supplierId?: number;
  category?: string;
};
