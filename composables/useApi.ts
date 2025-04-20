import axios from 'axios'
import { useRuntimeConfig } from '#imports'

export const useApi = () => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: config.public.apiBase, // viene de .env
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // Agregar interceptores para modificar los request antes de que salga 
    // y manejar los respuestas del servidor
  return instance
}
