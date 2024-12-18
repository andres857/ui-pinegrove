<template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <!-- Formulario -->
      <form @submit.prevent="actualizarDatos" class="space-y-4 mb-8">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Latitude:
          </label>
          <input 
            v-model="formData.latitude"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
  
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Longitude:
          </label>
          <input 
            v-model="formData.longitude"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
  
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Radius Meters:
          </label>
          <input 
            v-model="formData.radiusMeters"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
  
        <button 
          type="submit"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Actualizar Datos
        </button>
        <button
          type="button"
          class="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          v-on:click="borrarDatos"
        >
          Borrar Datos
        </button>
      </form>
  
      <!-- Visualización de datos -->
      <div class="bg-gray-100 p-4 rounded-md">
        <h3 class="text-lg font-bold mb-4 text-gray-800">Datos Actualizados:</h3>
        <div class="space-y-2">
          <p class="text-gray-700">
            <span class="font-semibold">Latitude:</span> {{ datosActualizados.latitude }}
          </p>
          <p class="text-gray-700">
            <span class="font-semibold">Longitude:</span> {{ datosActualizados.longitude }}
          </p>
          <p class="text-gray-700">
            <span class="font-semibold">Radius Meters:</span> {{ datosActualizados.radiusMeters }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  interface FormData {
    latitude: string;
    longitude: string;
    radiusMeters: string;
  }
  
  export default defineComponent({
    name: 'FormularioActualizable',
    setup() {
      const formData = ref<FormData>({
        latitude: '',
        longitude: '',
        radiusMeters: ''
      })
  
      const datosActualizados = ref<FormData>({
        latitude: '',
        longitude: '',
        radiusMeters: ''
      })
  
      const actualizarDatos = (): void => {
        // Actualizar los datos
        datosActualizados.value = { ...formData.value }
        // Limpiar el formulario
        formData.value = {
          latitude: '',
          longitude: '',
          radiusMeters: ''
        }
      }

      const borrarDatos = (): void => {
        // Borrar los datos
        datosActualizados.value = {
          latitude: '',
          longitude: '',
          radiusMeters: ''
        }
      }
  
      return {
        formData,
        datosActualizados,
        actualizarDatos,
        borrarDatos
      }
    }
  })
  </script>