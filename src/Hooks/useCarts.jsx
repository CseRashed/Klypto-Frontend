import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useCarts() {
  const axiosSecure = useAxios()

  const { data: carts = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/carts')
      // যদি API array না পাঠায়, তবে fallback
      return Array.isArray(res.data) ? res.data : res.data.carts || []
    },
  })

  return { carts, isLoading, isError, refetch }
}
