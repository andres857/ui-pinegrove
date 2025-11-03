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

          <NuxtLink to="/devices" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span class="text-sm font-medium">Devices</span>
          </NuxtLink>

          <NuxtLink to="/report" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-yellow-500 text-gray-900 transition-all">
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
            <h1 class="text-2xl font-semibold text-white">Report</h1>
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
          <!-- Stats Card -->
          <div class="mb-6">
            <div class="bg-gray-800 rounded-lg border border-gray-700 p-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-400 font-medium mb-1">Total Devices</p>
                  <p class="text-3xl font-bold text-white">
                    <span v-if="isLoadingCount" class="animate-pulse text-gray-500">Loading...</span>
                    <span v-else>{{ totalDevices }}</span>
                  </p>
                </div>
                <div class="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Search and Actions -->
          <div class="mb-6 flex items-center justify-between gap-4">
            <div class="flex-1 max-w-md">
              <input
                v-model="search"
                type="text"
                placeholder="Search Location..."
                class="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm text-white placeholder-gray-400"
              />
            </div>
            <button 
              @click="downloadExcel"
              :disabled="isDownloading"
              class="px-5 py-2.5 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div v-if="isDownloading" role="status">
                <svg aria-hidden="true" class="inline w-4 h-4 text-gray-900 animate-spin fill-gray-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              {{ isDownloading ? 'Downloading...' : 'Download Report' }}
            </button>
          </div>

          <!-- Loading view -->
          <div v-if="isLoading" class="bg-gray-800 rounded-lg border border-gray-700 p-12">
            <div class="text-center flex flex-col items-center justify-center gap-4">
              <div role="status">
                <svg aria-hidden="true" class="inline w-10 h-10 text-gray-700 animate-spin fill-yellow-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>
              <p class="text-gray-300 text-lg">Loading report data...</p>
            </div>
          </div>

          <!-- Data table -->
          <div v-else class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"> 
            <EasyDataTable
              :headers="headers"
              :items="locations"
              :search-value="search"
              @expand-row="loadIntroduction"
              table-class-name="customize-table-dark"
              :body-row-class-name="bodyRowClassNameFunction"
            >
              <template #expand="item">
                <div
                  v-if="item.introduction"
                  style="padding:25px 15px"
                  class="bg-gray-900"
                >       
                  <EasyDataTable
                    :headers="deviceHeaders"
                    :items="deviceDetailsMap[item.id_location] || []"
                    :loading="loadingStates[item.id_location]"
                    :sort-by="sortBy"
                    :sort-type="sortType"
                    show-index
                    table-class-name="customize-table-dark-nested"
                  >
                    <template #item-status="{ status }">
                      <StatusIconDevice :status="status" style="margin-left: 8px;" />
                    </template>
                  </EasyDataTable>
                </div>
              </template>
            </EasyDataTable>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRuntimeConfig } from '#app';
  import { ref } from "vue";
  import axios from 'axios';
  import * as XLSX from 'xlsx';
  import type { Header, Item, SortType } from "vue3-easy-data-table";
  import type { SigfoxDevice } from '~/components/types/index';
  import StatusIconDevice from '~/components/StatusIconDevice.vue';
  import {  differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths } from 'date-fns';

  interface Location {
      id: string
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

  const headers: Header[] = [
    { text: 'index', value: 'index' },
    { text: 'Location', value: 'location' },
    { text: 'Micro base station ', value: 'mbs' },
    { text: 'Devices at the location ', value: 'associated_devices',sortable: true },
    { text: 'City ', value: 'city' },
    { text: 'Province ', value: 'province' },
    { text: 'Address ', value: 'address' },
    { text: 'Radius ', value: 'radius' },
  ];

  // Headers para la tabla de devices
  const deviceHeaders: Header[] = [
      { text: 'Status', value: 'status' },
      { text: 'Device ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Device Type', value: 'deviceType' },
      { text: 'Last Seen', value: 'lastLocationUpdate' },
  ];

  const search = ref("");
  const searchField = ref(["location", "city", "province", "address"]);

  const locations = ref<Location[]>([])
  const totalDevices = ref(0)
  const isLoadingCount = ref(false)

  const isLoading = ref(false)
  const isDownloading = ref(false)
  const error = ref<string | null>(null)

  const deviceDetailsMap = ref<Record<string, any[]>>({});
  const loadingStates = ref<Record<string, boolean>>({});

  const sortBy = ref("associated_devices"); 
  const sortType = ref<SortType>("asc"); 

  // obtener las ubicaciones
  const fetchReport = async () => {
      isLoading.value = true
      error.value = null        
      try {
          const response = await axios.get<Location[]>(`${apiBase}/locations/report/e8a53dfb-bd89-4419-9602-414bea118aae`)
          locations.value = response.data.sort((a, b) => {
              return (a.index || 0) - (b.index || 0)
          })
          console.log(response.data);
      } catch (e) {
          error.value = 'Error al cargar las ubicaciones'
          console.error('Error fetching locations:', e)
      } finally {
          isLoading.value = false
      }
  }

  const formatDateLastSeen = (dateString: string | null): string => {
    if (!dateString) return 'No disponible';
    
    try {
        const date = new Date(dateString);
        const now = new Date();
        
        if (isNaN(date.getTime())) {
            return 'Fecha inválida';
        }

        const secondsDiff = differenceInSeconds(now, date);
        const minutesDiff = differenceInMinutes(now, date);
        const hoursDiff = differenceInHours(now, date);
        const daysDiff = differenceInDays(now, date);
        const monthsDiff = differenceInMonths(now, date);

        if (secondsDiff < 60) {
            return 'a few seconds ago';
        } else if (minutesDiff < 60) {
            return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} minutes ago`;
        } else if (hoursDiff < 24) {
            return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} hours ago`;
        } else if (daysDiff < 30) {
            return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} days ago`;
        } else {
            return `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} months ago`;
        }
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return 'Error en fecha';
    }
  };

  const loadIntroduction = async (index: number): Promise<void> => {
    const expandedItem = locations.value[index];
    if (!expandedItem.introduction) {
      expandedItem.expandLoading = true;
      expandedItem.introduction = expandedItem.associated_devices;
      
      if (!deviceDetailsMap.value[expandedItem.id_location]) {
        loadingStates.value[expandedItem.id_location] = true;
        
        try {
          const devicesPromises = expandedItem.devices.map((deviceId:any) => 
            axios.get<SigfoxDevice>(`${apiBase}/devices/${deviceId}`)
          );
          
          const responses = await Promise.all(devicesPromises);
          
          deviceDetailsMap.value[expandedItem.id_location] = responses.map((response:any) => {
            const lastUpdate = new Date(response.data.lastLocationUpdate);
            const now = new Date();
            const diffHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
            
            const status = diffHours <= 48 ? 'Connected' : 'Disconnected';

            return {
              id: response.data.SigfoxId,
              name: response.data.name || '',
              deviceType: response.data.deviceType || '',
              lastLocationUpdate: formatDateLastSeen(response.data.lastLocationUpdate),
              status:status
            };
          });

        } catch (e) {
          error.value = 'Error al cargar los detalles de los dispositivos';
          console.error('Error fetching device details:', e);
        } finally {
          loadingStates.value[expandedItem.id_location] = false;
        }
      }
      
      expandedItem.expandLoading = false;
    }
  };

  const bodyRowClassNameFunction = (item: any): string => {
    return item.index === 0 ? 'first-row-dark' : '';
  };

  const formatLocationForExcel = (location: any) => {
    return {
      'Location': location.location,
      'Micro base station': location.mbs,
      'Devices at location': location.associated_devices,
      'City': location.city,
      'Province': location.province,
      'Address': location.address,
      'Radius (meters)': location.radius
    };
  };

  const formatDeviceForExcel = (device: any, locationName: string) => {
    return {
      'Location': locationName,
      'Device ID': device.id,
      'Device Name': device.name,
      'Device Type': device.deviceType,
      'Status': device.status,
      'Last Seen': device.lastLocationUpdate
    };
  };

  const downloadExcel = async () => {
    try {
      isDownloading.value = true;
      
      const response = await axios.get(
        `${apiBase}/locations/report/e8a53dfb-bd89-4419-9602-414bea118aae/download/excel`,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.xlsx');
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      error.value = 'Error al descargar el archivo';
    } finally {
      isDownloading.value = false;
    }
  };

  const downloadCSV = async () => {
    try {
      isDownloading.value = true;
      
      const response = await axios.get(
        `${apiBase}/locations/report/e8a53dfb-bd89-4419-9602-414bea118aae/download/csv`,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv');
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading CSV file:', error);
      error.value = 'Error al descargar el archivo';
    } finally {
      isDownloading.value = false;
    }
  };

  const fetchDeviceCount = async () => {
      isLoadingCount.value = true
      try {
        const response = await axios.get<number>(
          `${apiBase}/devices/client/e8a53dfb-bd89-4419-9602-414bea118aae/count`
        )
        totalDevices.value = response.data
        console.log('Total devices:', response.data)
      } catch (e) {
        console.error('Error fetching device count:', e)
        error.value = 'Error al cargar el conteo de dispositivos'
      } finally {
        isLoadingCount.value = false
      }
    }

  onMounted(() => {
      fetchReport() 
      fetchDeviceCount()
  })
</script>

<style>
/* Estilo personalizado para el tema oscuro */
.customize-table-dark {
  --easy-table-border: 1px solid #374151;
  --easy-table-row-border: 1px solid #374151;
  
  --easy-table-header-background-color: #1f2937;
  --easy-table-header-font-color: #f3f4f6;
  
  --easy-table-body-row-background-color: #1f2937;
  --easy-table-body-row-font-color: #e5e7eb;
  
  --easy-table-body-row-hover-background-color: #eab308;
  --easy-table-body-row-hover-font-color: #111827;
  
  --easy-table-footer-background-color: #1f2937;
  --easy-table-footer-font-color: #9ca3af;
}

.customize-table-dark-nested {
  --easy-table-border: 1px solid #4b5563;
  --easy-table-row-border: 1px solid #4b5563;
  
  --easy-table-header-background-color: #374151;
  --easy-table-header-font-color: #f3f4f6;
  
  --easy-table-body-row-background-color: #111827;
  --easy-table-body-row-font-color: #d1d5db;
  
  --easy-table-body-row-hover-background-color: #eab308;
  --easy-table-body-row-hover-font-color: #111827;
}

.first-row-dark {
  --easy-table-body-row-background-color: #eab308;
  --easy-table-body-row-font-color: #111827;
  font-weight: 600;
}

.customize-table-dark th,
.customize-table-dark-nested th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 14px 12px;
}

.customize-table-dark td,
.customize-table-dark-nested td {
  padding: 12px;
}
</style>