<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Incluir Navbar original si lo prefieres, o usar el nuevo diseño -->
    <Navbar v-if="false"/>
    
    <!-- Nuevo diseño con sidebar -->
    <div class="flex min-h-screen">
      <!-- Sidebar Navegación -->
      <aside class="w-64 bg-gray-800 border-r border-gray-700">
        <div class="p-6 border-b border-gray-700">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span class="text-gray-900 font-bold">F</span>
            </div>
            <span class="text-xl font-bold text-yellow-500">Fiillo</span>
          </div>
        </div>
        
        <nav class="p-4 space-y-1">
          <NuxtLink to="/" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <span class="text-sm font-medium">Home</span>
          </NuxtLink>
          
          <NuxtLink to="/locations" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-yellow-500 text-gray-900 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span class="text-sm font-medium">Locations</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Contenido Principal -->
      <main class="flex-1">
        <!-- Header -->
        <header class="bg-gray-800 border-b border-gray-700">
          <div class="px-8 py-4 flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-white">Location Details</h1>
            <div class="flex items-center space-x-4">
              <button class="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </button>
              <div class="flex items-center space-x-3">
                <div class="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span class="text-gray-900 text-sm font-semibold">FA</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-white">Admin</p>
                  <p class="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Contenido -->
        <div class="p-8">
          <div v-if="locationInfo" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Panel Izquierdo - Información -->
            <div class="lg:col-span-1 space-y-4">
              
              <!-- Card de Información Básica -->
              <div class="bg-gray-800 rounded-lg border border-gray-700">
                <div class="px-5 py-4 border-b border-gray-700 flex items-center justify-between">
                  <h2 class="text-base font-semibold text-white">Information</h2>
                  <button
                    v-if="!isEditing"
                    @click="startEditing"
                    class="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  </button>
                </div>
                
                <div v-if="!isEditing" class="px-5 py-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">Name</span>
                    <span class="text-sm text-white">{{ locationInfo.name }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">Address</span>
                    <span class="text-sm text-white text-right">{{ locationInfo.address }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">City</span>
                    <span class="text-sm text-white">{{ locationInfo.city }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">Province</span>
                    <span class="text-sm text-white">{{ locationInfo.province }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">Country</span>
                    <span class="text-sm text-white">{{ locationInfo.country }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">ZIP Code</span>
                    <span class="text-sm text-white">{{ locationInfo.zip }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3">
                    <span class="text-sm text-gray-400 font-medium">District</span>
                    <span class="text-sm text-white">{{ locationInfo.microbs }}</span>
                  </div>
                </div>
                
                <div v-else class="px-5 py-4 space-y-3">
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">Name</label>
                    <input v-model="formData.name" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">Address</label>
                    <input v-model="formData.address" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">City</label>
                    <input v-model="formData.city" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">Province</label>
                    <input v-model="formData.province" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">Country</label>
                    <input v-model="formData.country" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">ZIP Code</label>
                    <input v-model.number="formData.zip" type="number" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">District</label>
                    <input v-model="formData.microbs" type="text" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                </div>
              </div>

              <!-- Card de Coordenadas -->
              <div class="bg-gray-800 rounded-lg border border-gray-700">
                <div class="px-5 py-4 border-b border-gray-700">
                  <h2 class="text-base font-semibold text-white">Coordinates & Radius</h2>
                </div>
                
                <div v-if="!isEditing" class="px-5 py-4">
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">Latitude</span>
                    <span class="text-sm text-white">{{ locationInfo.latitude }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3 border-b border-gray-700">
                    <span class="text-sm text-gray-400 font-medium">Longitude</span>
                    <span class="text-sm text-white">{{ locationInfo.longitude }}</span>
                  </div>
                  <div class="flex justify-between items-center py-3">
                    <span class="text-sm text-gray-400 font-medium">Radius (meters)</span>
                    <span class="text-sm text-white">{{ locationInfo.radiusMeters }}</span>
                  </div>
                </div>
                
                <div v-else class="px-5 py-4 space-y-3">
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">Latitude</label>
                    <input v-model.number="formData.latitude" type="number" step="any" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">Longitude</label>
                    <input v-model.number="formData.longitude" type="number" step="any" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-xs font-medium text-yellow-500 uppercase tracking-wide">Radius (meters)</label>
                    <input v-model.number="formData.radiusMeters" type="number" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white">
                  </div>
                </div>
              </div>

              <!-- Card de Notas -->
              <div class="bg-gray-800 rounded-lg border border-gray-700">
                <div class="px-5 py-4 border-b border-gray-700">
                  <h2 class="text-base font-semibold text-white">Notes</h2>
                </div>
                
                <div v-if="!isEditing" class="px-5 py-4">
                  <p class="text-sm text-gray-300 leading-relaxed">
                    {{ locationInfo.notes || 'No notes available' }}
                  </p>
                </div>
                
                <div v-else class="px-5 py-4">
                  <textarea
                    v-model="formData.notes"
                    rows="4"
                    class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all resize-none text-sm text-white"
                    placeholder="Add notes about this location..."
                  ></textarea>
                </div>
              </div>

              <!-- Botones de Acción -->
              <div v-if="isEditing" class="flex space-x-3">
                <button
                  @click="cancelEditing"
                  class="flex-1 px-4 py-2.5 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  @click="updateDetails"
                  class="flex-1 px-4 py-2.5 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <!-- Panel Derecho - Mapa -->
            <div class="lg:col-span-2">
              <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div class="px-5 py-4 border-b border-gray-700">
                  <h2 class="text-base font-semibold text-white">Map View</h2>
                </div>
                
                <div class="relative bg-gray-700" style="height: calc(100vh - 220px)">
                  <!-- Componente de Mapa -->
                  <Map 
                    :latitude="Number(locationInfo.latitude)" 
                    :longitude="Number(locationInfo.longitude)"
                    :radius="Number(locationInfo.radiusMeters)"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Estado de Carga -->
          <div v-else class="flex items-center justify-center py-20">
            <div class="text-center">
              <div class="w-16 h-16 border-4 border-gray-600 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-300">Loading location details...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Map from '~/components/GoogleMapView.vue'
import Navbar from '~/components/Navbar.vue'

// Interfaces
interface LocationDetail {
  id: string;
  name: string;
  address: string;
  country: string;
  city: string;
  province: string;
  microbs: string;
  zip: number;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  notes: string | null;
  clientId: string | null;
  client: any | null;
}

interface LocationDetailsPrint {
  name: string;
  address: string;
  country: string;
  city: string;
  province: string;
  microbs: string;
  zip: number;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  notes: string | null;
}

// Configuración y rutas
const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const route = useRoute()
const locationId = route.params.id as string

// Estado
const locationInfo = ref<Partial<LocationDetail> | null>(null)
const formData = ref<LocationDetailsPrint | null>(null)
const isEditing = ref(false)

// Cargar detalles de la ubicación
const loadLocationDetails = async () => {
  try {
    const response = await axios.get(`${apiBase}/locations/${locationId}`)
    locationInfo.value = response.data
    if (locationInfo.value) {
      delete locationInfo.value.id
      delete locationInfo.value.client
      delete locationInfo.value.clientId
    }
    loadUpdate()
  } catch (error) {
    console.error('Error loading location details:', error)
  }
}

// Preparar datos para edición
const loadUpdate = () => {
  if (locationInfo.value) {
    formData.value = {
      name: locationInfo.value?.name || '',
      address: locationInfo.value?.address || '',
      country: locationInfo.value?.country || '',
      city: locationInfo.value?.city || '',
      province: locationInfo.value?.province || '',
      microbs: locationInfo.value?.microbs || '',
      zip: locationInfo.value?.zip || 0,
      latitude: locationInfo.value?.latitude || 0,
      longitude: locationInfo.value?.longitude || 0,
      radiusMeters: locationInfo.value?.radiusMeters || 0,
      notes: locationInfo.value?.notes || ''
    }
  }
}

// Iniciar modo edición
const startEditing = () => {
  loadUpdate()
  isEditing.value = true
}

// Cancelar edición
const cancelEditing = () => {
  loadUpdate()
  isEditing.value = false
}

// Actualizar detalles
const updateDetails = async () => {
  if (formData.value) {
    // Actualizar datos localmente
    locationInfo.value = {
      ...locationInfo.value,
      ...formData.value
    }
    
    try {
      // Enviar al servidor
      await axios.put(`${apiBase}/locations/${locationId}`, formData.value)
      isEditing.value = false
    } catch (error) {
      console.error('Error updating location:', error)
    }
  }      
}

// Montar componente
onMounted(() => {
  loadLocationDetails()
})
</script>