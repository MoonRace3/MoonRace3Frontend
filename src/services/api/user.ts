import { LoginRequest, LoginResponse, User } from '@/types/auth'
import { baseApiAxiosInstance } from './api'

export const getMe = async (): Promise<User> => {
  const response = await baseApiAxiosInstance.get('/me')
  return response.data
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await baseApiAxiosInstance.post('/login', data)
  return response.data
}
