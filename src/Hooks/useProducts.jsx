import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

export default function useProducts() {
  const axiosSecure = useAxios();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"], // unique key for caching
    queryFn: async () => {
      const response = await axiosSecure.get("/products");
      return response.data; // ensure API returns an array
    },
    staleTime: 5 * 60 * 1000, // 5 minutes, data is fresh for 5 mins
    cacheTime: 10 * 60 * 1000, // 10 minutes, cache retention
    refetchOnWindowFocus: true, // when user returns to page, refetch
    refetchInterval: 30 * 1000, // background refetch every 30s
    refetchIntervalInBackground: true, // continue refetch even if tab not focused
  });

  return {
    products: data || [],
    isLoading,
    isError,
    refetch,
  };
}
