import {ContextProductType} from "@/models/Machine";

export const calculateTotalAmount = (
  products: ContextProductType[]
): number => {
  return products.reduce((acc, product) => acc + product.price, 0);
};
