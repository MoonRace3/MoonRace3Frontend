import axios, { AxiosInstance } from 'axios'
import { ApiUrls } from '@/constants/apiUrls'

const baseApiAxiosInstance: AxiosInstance = axios.create({
  baseURL: ApiUrls.BASE_API_URL,
})

const setAuthToken = async (token: string | null) => {
  if (token) {
    baseApiAxiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`
  } else {
    delete baseApiAxiosInstance.defaults.headers.common['Authorization']
  }
}

export { setAuthToken, baseApiAxiosInstance }
