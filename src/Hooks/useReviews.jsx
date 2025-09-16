import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useReviews() {
  const axiosSecure = useAxios()

  const { data: reviews = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews')
      // যদি API object return করে, তখন array বের করে দিতে হবে
      return Array.isArray(res.data) ? res.data : res.data.reviews || []
    },
  })

  return { reviews, isLoading, isError, refetch }
}
