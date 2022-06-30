import { QueryClient } from 'react-query'
import axios, { AxiosRequestConfig } from 'axios'

export const END_POINT = 'https://api.thecatapi.com/v1/images/search'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true
    },
    mutations: {
      useErrorBoundary: true
    }
  }
})

const axiosWrapper = async ({
  method,
  url,
  params,
  body
}: {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  params?: {}
  body?: {}
}) => {
  const token = localStorage.getItem('token')
  try {
    const config: AxiosRequestConfig = {
      baseURL: END_POINT,
      withCredentials: true,
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
    const { data } =
      (method === 'get' && (await axios.get(url, config))) ||
      (method === 'post' && (await axios.post(url, body, config))) ||
      (method === 'put' && (await axios.put(url, body, config))) ||
      (method === 'delete' && (await axios.delete(url, config))) ||
      {}
    return data
  } catch (error: any) {
    console.log(error.response.status, error)
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/401'
    }
  }
}

export const GET = (url: string, params?: {}) => axiosWrapper({ method: 'get', url, params })

export const POST = (url: string, body?: {}, params?: {}) =>
  axiosWrapper({ method: 'post', url, body, params })

export const PUT = (url: string, body?: {}, params?: {}) =>
  axiosWrapper({ method: 'put', url, body, params })

export const DELETE = (url: string) => axiosWrapper({ method: 'delete', url })
