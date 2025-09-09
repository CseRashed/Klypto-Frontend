import axios from 'axios'

export const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_API_URL, 
})
export default function useAxios() {
  return axiosSecure
}