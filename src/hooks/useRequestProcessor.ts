import { useQuery } from "@tanstack/react-query";
import { Product } from "../types";

const useRequestProcessor = (
  key: string[],
  queryFunction: () => Promise<Product[]>,
  options = {}
) => {
  return useQuery({
    queryKey: key,
    queryFn: queryFunction,
    ...options,
  });
};

export default useRequestProcessor;
