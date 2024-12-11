<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRuntimeConfig } from '#app';
  import { useRouter } from 'vue-router';
  import type { Header } from "vue3-easy-data-table";
  import Navbar from '~/components/Navbar.vue';
  import type { SigfoxDevice } from '~/components/types/index'

  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase
  const router = useRouter()

  const searchValue = ref('')
  const itemsPerPage = ref(10)
  const serverItemsLength = ref(0)

  const devices = ref<SigfoxDevice[]>([])
  const dataTable = ref()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const headers: Header[] = [
      { text: "Name", value: "friendlyName" },
      { text: "Sigfox ID", value: "SigfoxId" },
      { text: "Device Type", value: "deviceType" },
      { text: "Last Latitude", value: "lastLatitude" },
      { text: "Last Longitude", value: "lastLongitude" },
      { 
        text: "Last Update", 
        value: "lastLocationUpdate",
        sortable: true // Habilita el ordenamiento para esta columna
    },
  ];

  const fetchDevices = async () => {
      isLoading.value = true
      error.value = null
      try {
          const response = await axios.get<SigfoxDevice[]>(`${apiBase}/devices/`)
          devices.value = response.data;
          formatMessagesHistory();
      } catch (e) {
          error.value = 'Error al cargar los dispositivos'
          console.error('Error fetching devices:', e)
      } finally {
          isLoading.value = false
      }
  }

  const handleRowClick = (item: SigfoxDevice) => {
      router.push({
          path: `/devices/${item.deviceId}`,
      });
  }

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  const formatMessagesHistory = () => {
    if (!devices.value) return;
    
    // Función auxiliar para convertir fecha a timestamp
    const getTimestamp = (dateString: string) => new Date(dateString).getTime();
    
    dataTable.value = devices.value
        // Ordenamos los dispositivos por lastLocationUpdate
        .sort((a: SigfoxDevice, b: SigfoxDevice) => {
            // Convertimos las fechas a timestamps para una comparación correcta
            const dateA = getTimestamp(a.lastLocationUpdate);
            const dateB = getTimestamp(b.lastLocationUpdate);
            return dateB - dateA; // Ordenamiento descendente
        })
        // Luego formateamos las fechas
        .map((device: SigfoxDevice) => ({
            ...device,
            // Formateamos lastLocationUpdate para la visualización
            lastLocationUpdate: formatDate(device.lastLocationUpdate)
        }));
  }

  onMounted(() => {
      fetchDevices()
  })
</script>

<template>
    <div>
        <Navbar/>
        <div class="grid gap-y-4 px-40">
            <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-10">Devices</h1>
            <div class="relative">
                <input
                    v-model="searchValue"
                    class="px-5 py-3 pl-10 text-gray-700 placeholder-gray-400 bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-2/5"
                    placeholder="Search device..."
                />
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="w-full mt-5"> 
                <EasyDataTable
                    v-if="dataTable"
                    @click-row="handleRowClick"
                    :headers="headers"
                    :items="dataTable"
                    :search-value="searchValue"
                    :loading="isLoading"
                    :items-per-page="itemsPerPage"
                    :rows-items="[5,10,15,20]"
                    :rows-per-page="10"
                    alternating
                    buttons-pagination
                    show-index
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.vue3-easy-data-table__tbody tr) {
    cursor: pointer;
}

:deep(.vue3-easy-data-table__tbody tr:hover) {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>