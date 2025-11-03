<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Diseño con sidebar -->
    <div class="flex min-h-screen">
      <!-- Sidebar Navegación -->
      <aside class="w-64 bg-gray-800 border-r border-gray-700">
        <div class="p-6 border-b border-gray-700">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span class="text-gray-900 font-bold">T</span>
            </div>
            <span class="text-xl font-bold text-yellow-500">Technogym</span>
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

          <NuxtLink to="/devices" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span class="text-sm font-medium">Devices</span>
          </NuxtLink>

          <NuxtLink to="/report" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span class="text-sm font-medium">Report</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Contenido Principal -->
      <main class="flex-1">
        <!-- Header -->
        <header class="bg-gray-800 border-b border-gray-700">
          <div class="px-8 py-4 flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-white">Locations</h1>
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
          <!-- Contenedor del mapa -->
          <div class="mb-6 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-700">
              <h2 class="text-base font-semibold text-white">Map View</h2>
            </div>
            <div class="w-full h-[600px]">
              <MultipleLocationsMap 
                :locations="locations"
                :devices="devices"
                @device-click="handleDeviceClick"
              />
            </div>
          </div>

          <!-- Search and Create Button -->
          <div class="mb-6 flex items-center justify-between gap-4">
            <div class="relative flex-1 max-w-md">
              <input
                v-model="searchValue"
                class="w-full px-4 py-2.5 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white placeholder-gray-400"
                placeholder="Search location..."
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <button class="px-6 py-2.5 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all text-sm font-medium flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Create Location
            </button>
          </div>

          <!-- Data Table -->
          <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <EasyDataTable
              @click-row="handleRowClick"
              :headers="headers"
              :items="locations"
              :search-value="searchValue"
              :loading="isLoading"
              :items-per-page="itemsPerPage"
              :rows-items="[5,10,15,20]"
              :rows-per-page="10"
              buttons-pagination
              :sort-by="sortBy"
              :sort-type="sortType"
              @sort="handleSort"
              table-class-name="customize-table-locations"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRuntimeConfig } from '#app'
    import { useRouter } from 'vue-router'
    import type { Header, Item, ClickRowArgument, SortType  } from "vue3-easy-data-table";
    import MultipleLocationsMap from '~/components/MultipleLocations.vue'

    // Definimos las interfaces para tipar nuestros datos
    interface Client {
        id: string
        name: string
        email: string
        phone: string
        address: string
        isActive: boolean
        createdAt: string
        updatedAt: string
    }

    interface Location {
        id: string
        index: number
        name: string
        latitude: string
        longitude: string
        radiusMeters: number
        description: string
        clientId: string | null
        client: Client | null
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    const idClient = config.public.idClient

    const router = useRouter()

    const searchValue = ref('')
    // Variables para la paginación
    const itemsPerPage = ref(10)
    const serverItemsLength = ref(0) // Total de items si usas paginación del servidor

    // Creamos las referencias reactivas necesarias
    const locations = ref<Location[]>([])
    const devices = ref()

    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const sortBy = ref("index");  // Hacemos que sea reactivo
    const sortType = ref<SortType>("asc");  // Ordenamiento ascendente por defecto

    const headers: Header[] = [
        { text: "Index", value: "index", sortable: true }, 
        { text: "Name", value: "name" },
        { text: "Street", value: "address" },
        { text: "City", value: "city" },
        { text: "Country", value: "country" },
        { text: "Province", value: "province" },
        { text: "Microbs", value: "microbs" },
        { text: "Zip", value: "zip" },
        { text: "Latitude", value: "latitude"},
        { text: "Longitude", value: "longitude"},
        { text: "Radio", value: "radiusMeters"},
        { text: "Description", value: "description"},
    ];

    // Función para obtener las ubicaciones
    const fetchLocations = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await axios.get<Location[]>(`${apiBase}/locations/`)
            locations.value = response.data.map((location: Location) => {
                if (location.name === 'Not Seen' || location.name === 'In transit') {
                    return null
                }
                return location
            }).filter((location: Location | null) => location !== null)
            console.log(locations.value);
            
        } catch (e) {
            error.value = 'Error al cargar las ubicaciones'
            console.error('Error fetching locations:', e)
        } finally {
            isLoading.value = false
        }
    }

    // Función para obtener las device
    const fetchDevices = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await axios.get<Location[]>(`${apiBase}/devices/client/${idClient}`)
            devices.value = response.data
        } catch (e) {
            error.value = 'Error al cargar las devices'
            console.error('Error fetching locations:', e)
        } finally {
            isLoading.value = false
        }
    }

    const handleRowClick = (item: any) => {
        console.log('clicked',item);
        router.push({
            path: `/locations/${item.id}`,
        });
    }

    // Añadir el manejador para los clicks en los marcadores
    const handleMarkerClick = (location) => {
        router.push({
            path: `/locations/${location.id}`,
        });
    }

    const handleDeviceClick = (device) => {
        router.push({
            path: `/devices/${device.deviceId}`,
        });
    }

    const handleSort = (event: { sortBy: string, sortType: SortType }) => {
        sortBy.value = event.sortBy;
        sortType.value = event.sortType;
    };
    
    // Cargamos los datos cuando el componente se monta
    onMounted(() => {
        fetchLocations()
        fetchDevices()
    })
</script>

<style>
/* Estilo personalizado para la tabla de locations con tema oscuro */
.customize-table-locations {
  --easy-table-border: 1px solid #374151;
  --easy-table-row-border: 1px solid #374151;
  
  --easy-table-header-background-color: #1f2937;
  --easy-table-header-font-color: #f3f4f6;
  
  /* Todas las filas con el mismo color */
  --easy-table-body-row-background-color: #1f2937;
  --easy-table-body-row-font-color: #e5e7eb;
  
  /* Filas pares con el mismo color que las impares */
  --easy-table-body-even-row-background-color: #1f2937;
  
  --easy-table-body-row-hover-background-color: #eab308;
  --easy-table-body-row-hover-font-color: #111827;
  
  --easy-table-footer-background-color: #1f2937;
  --easy-table-footer-font-color: #9ca3af;
}

.customize-table-locations th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 14px 12px;
}

.customize-table-locations td {
  padding: 12px;
}

/* Mantener el cursor pointer para las filas */
:deep(.customize-table-locations .vue3-easy-data-table__body tr) {
  cursor: pointer;
}

/* Efecto hover personalizado ya está definido en las variables CSS */
:deep(.customize-table-locations .vue3-easy-data-table__body tr:hover) {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Estilo para los botones de paginación */
:deep(.customize-table-locations .vue3-easy-data-table__footer) {
  padding: 16px 12px;
}

:deep(.customize-table-locations .pagination__rows-per-page select) {
  background-color: #374151;
  color: #f3f4f6;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  padding: 4px 8px;
}

:deep(.customize-table-locations .pagination__rows-per-page select:focus) {
  outline: none;
  border-color: #eab308;
  ring: 1px solid #eab308;
}

:deep(.customize-table-locations button.pagination__button) {
  background-color: #374151;
  color: #f3f4f6;
  border: 1px solid #4b5563;
  transition: all 0.2s ease;
}

:deep(.customize-table-locations button.pagination__button:hover:not(.disabled)) {
  background-color: #eab308;
  color: #111827;
  border-color: #eab308;
}

:deep(.customize-table-locations button.pagination__button.active) {
  background-color: #eab308;
  color: #111827;
  border-color: #eab308;
}

:deep(.customize-table-locations button.pagination__button.disabled) {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Loader personalizado */
:deep(.customize-table-locations .vue3-easy-data-table__loading) {
  background-color: rgba(17, 24, 39, 0.9);
}

:deep(.customize-table-locations .vue3-easy-data-table__loading .loading) {
  color: #eab308;
}
</style>