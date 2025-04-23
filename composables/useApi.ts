import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { useRuntimeConfig,  } from '#imports'
import { ref } from 'vue'

let instance: AxiosInstance | null = null

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  isLoading?: boolean;
}

export const useApi = () => {

  const isLoading = ref(true)
  const error = ref<string | null>(null)

  if (!instance){
    const config = useRuntimeConfig()

    instance = axios.create({
      baseURL: config.public.apiBase,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Interceptores 
    instance.interceptors.request.use(
      (config) => {
        isLoading.value = true
        return config
      },
      (error) => {
        isLoading.value = false
        return Promise.reject(error)
      }
    )
    
    instance.interceptors.response.use(
      (response) => {
        isLoading.value = false
        return response
      },
      (error) => {
        isLoading.value = false
        return Promise.reject(error)
      }
    )
  }

  const get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await instance!.get(url, config)
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      }
    } catch (err: any) {
      error.value = err
      throw err
    }
  }

  const post = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try{
      const response: AxiosResponse<T> = await instance!.post(url, data, config)
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      }
    } catch (err: any) {
      error.value = err
      throw err
    }
  }
  
  const put = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    // return instance!.put(url, data, config).then((response: AxiosResponse<T>) => response.data)
    try{
      const response: AxiosResponse<T> = await instance!.put(url, data, config)
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      }
    } catch (err: any) {
      error.value = err
      throw err
    }
  }
  
  const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance!.delete(url, config).then((response: AxiosResponse<T>) => response.data)
  }

  const getAxiosInstance = (): AxiosInstance => instance!

  return {
    isLoading,
    error,
    get,
    post,
    put,
    del,
    getAxiosInstance
  }
}
