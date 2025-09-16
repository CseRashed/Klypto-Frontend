import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useUsers() {
  const axiosSecure = useAxios()

  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['users'], // cache key
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      // যদি data array না হয় তবে fallback দিচ্ছি
      return Array.isArray(res.data) ? res.data : res.data.users || []
    },
  })

  return { users, isLoading, isError, refetch }
}
