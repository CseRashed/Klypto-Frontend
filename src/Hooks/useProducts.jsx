import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useProducts() {
  const axiosSecure = useAxios();

  // Fetch products using TanStack Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products"], // unique key for caching
    queryFn: async () => {
      const response = await axiosSecure.get("/products");
      return response.data; // ensure API returns an array
    },
  });

  return {
    products: data || [], // default empty array if data undefined
    isLoading,
    isError,
    refetch,
  };
}
