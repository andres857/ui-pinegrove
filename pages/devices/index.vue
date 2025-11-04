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
          
          <NuxtLink to="/locations" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span class="text-sm font-medium">Locations</span>
          </NuxtLink>

          <NuxtLink to="/devices" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-yellow-500 text-gray-900 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
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
            <h1 class="text-2xl font-semibold text-white">Devices</h1>
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
          <div v-if="dataTable">
            <!-- Search Bar -->
            <div class="mb-6">
              <div class="relative max-w-md">
                <input
                  v-model="searchValue"
                  @keydown="handleSearch"
                  class="w-full px-4 py-2.5 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white placeholder-gray-400"
                  placeholder="Search by SigfoxID (6 chars) or device name..."
                />
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg v-if="!isSearching" class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else aria-hidden="true" class="h-5 w-5 text-yellow-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#eab308"/>
                  </svg>
                </div>
              </div>
              
              <!-- Error message -->
              <div v-if="error" class="mt-2 text-sm text-red-400">
                {{ error }}
              </div>
            </div>

            <!-- Data Table -->
            <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <EasyDataTable
                @click-row="handleRowClick"
                :headers="headers"
                :items="dataTable"
                :search-value="searchValue"
                :loading="isLoading"
                :items-per-page="itemsPerPage"
                :rows-items="[5,10,15,20]"
                :rows-per-page="10"
                buttons-pagination
                show-index
                table-class-name="customize-table-devices"
              >
                <!-- Use the item slot syntax for the status column -->
                <template #item-status="{ status }">
                  <StatusIconDevice :status="status" style="margin-left: 8px;" />
                </template>
              </EasyDataTable>
            </div>
          </div>

          <!-- Loading view -->
          <div v-else class="bg-gray-800 rounded-lg border border-gray-700 p-12">
            <div class="text-center flex flex-col items-center justify-center gap-4">
              <div role="status">
                <svg aria-hidden="true" class="inline w-10 h-10 text-gray-700 animate-spin fill-yellow-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>
              <p class="text-gray-300 text-lg">Loading device data...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import axios from 'axios';
    import { useRuntimeConfig } from '#app';
    import { useRouter } from 'vue-router';
    import type { Header } from "vue3-easy-data-table";
    import type { SigfoxDevice } from '~/components/types/index';
    import StatusIconDevice from '~/components/StatusIconDevice.vue';

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    const router = useRouter()

    const searchValue = ref('')
    const itemsPerPage = ref(10)
    const isSearching = ref(false)
    const SIGFOX_ID_LENGTH = 6 // Longitud estándar de SigfoxId

    const dataTable = ref()
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const headers: Header[] = [
        { text: 'Status', value: 'status' },
        { text: "Sigfox ID", value: "SigfoxId" },
        { text: "Type", value: "aliasDeviceType" },
        { text: "Name", value: "friendlyName" },
        { text: "Last Location", value: "lastLocationName" },
        { 
            text: "Last Seen",
            value: "formattedTimestamp",
            sortable: true
        },
    ];

    const fetchDevices = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await axios.get<SigfoxDevice[]>(`${apiBase}/devices`)
            
            dataTable.value = response.data.map((device: any) => ({
                ...device,
                lastLocationName: device.locationHistory?.[0]?.locationName || 'Not Available',
                formattedTimestamp: formatDate(device.lastLocationUpdate)
            }));
            
        } catch (e) {
            error.value = 'Error al cargar los dispositivos'
            console.error('Error fetching devices:', e)
        } finally {
            isLoading.value = false
        }
    }

    // Buscar device específico en el backend
    const searchDeviceInBackend = async (sigfoxId: string) => {
        if (!sigfoxId.trim()) return;
        
        isSearching.value = true;
        error.value = null; // Limpiar errores anteriores
        
        try {
            const response = await axios.get<SigfoxDevice>(`${apiBase}/devices/search/${sigfoxId.trim()}`);
            
            const deviceFormatted = {
                ...response.data,
                lastLocationName: response.data.locationHistory?.[0]?.locationName || 'Not Available',
                formattedTimestamp: formatDate(response.data.lastLocationUpdate)
            };
            
            // Verificar si el device ya está en la tabla
            const exists = dataTable.value.some((d: any) => d.SigfoxId === deviceFormatted.SigfoxId);
            
            if (!exists) {
                // Agregar al inicio de la tabla
                dataTable.value = [deviceFormatted, ...dataTable.value];
            }
            
        } catch (e: any) {
            if (e.response?.status === 404) {
                error.value = `Device "${sigfoxId}" not found`;
            } else {
                error.value = 'Error searching device';
            }
            console.error('Error searching device:', e);
        } finally {
            isSearching.value = false;
        }
    }

    // Verificar si hay resultados locales
    const hasLocalResults = (query: string): boolean => {
        if (!query.trim() || !dataTable.value) return true;
        
        return dataTable.value.some((device: any) => 
            device.SigfoxId.toLowerCase().includes(query.toLowerCase()) ||
            device.friendlyName?.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Manejar la búsqueda cuando se presiona Enter (fallback)
    const handleSearch = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && searchValue.value.trim()) {
            error.value = null; // Limpiar errores
            
            if (!hasLocalResults(searchValue.value)) {
                searchDeviceInBackend(searchValue.value);
            }
        }
    }

    // Watch para búsqueda automática al completar 6 caracteres
    watch(searchValue, (newValue) => {
        // Limpiar error cuando el usuario empieza a escribir
        if (error.value) {
            error.value = null;
        }

        // Si tiene exactamente 6 caracteres (longitud de SigfoxId)
        if (newValue.trim().length === SIGFOX_ID_LENGTH) {
            // Verificar si hay resultados locales
            if (!hasLocalResults(newValue)) {
                // No hay resultados locales, buscar en backend automáticamente
                searchDeviceInBackend(newValue);
            }
        }
    });

    const handleRowClick = (item: SigfoxDevice) => {
        router.push({
            path: `/devices/${item.deviceId}`,
            query: { deviceStatus: item.status }
        });
    }

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return 'No disponible';
        return new Date(dateString).toLocaleString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    onMounted(() => {
        fetchDevices()
    })
</script>

<style>
/* Estilo personalizado para la tabla de devices con tema oscuro */
.customize-table-devices {
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

.customize-table-devices th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 14px 12px;
}

.customize-table-devices td {
  padding: 12px;
}

/* Mantener el cursor pointer para las filas */
:deep(.customize-table-devices .vue3-easy-data-table__body tr) {
  cursor: pointer;
}

/* Efecto hover personalizado */
:deep(.customize-table-devices .vue3-easy-data-table__body tr:hover) {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

/* Estilo para los botones de paginación */
:deep(.customize-table-devices .vue3-easy-data-table__footer) {
  padding: 16px 12px;
}

:deep(.customize-table-devices .pagination__rows-per-page select) {
  background-color: #374151;
  color: #f3f4f6;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  padding: 4px 8px;
}

:deep(.customize-table-devices .pagination__rows-per-page select:focus) {
  outline: none;
  border-color: #eab308;
  ring: 1px solid #eab308;
}

:deep(.customize-table-devices button.pagination__button) {
  background-color: #374151;
  color: #f3f4f6;
  border: 1px solid #4b5563;
  transition: all 0.2s ease;
}

:deep(.customize-table-devices button.pagination__button:hover:not(.disabled)) {
  background-color: #eab308;
  color: #111827;
  border-color: #eab308;
}

:deep(.customize-table-devices button.pagination__button.active) {
  background-color: #eab308;
  color: #111827;
  border-color: #eab308;
}

:deep(.customize-table-devices button.pagination__button.disabled) {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Loader personalizado */
:deep(.customize-table-devices .vue3-easy-data-table__loading) {
  background-color: rgba(17, 24, 39, 0.9);
}

:deep(.customize-table-devices .vue3-easy-data-table__loading .loading) {
  color: #eab308;
}
</style>