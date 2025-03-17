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
            <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-4">Devices</h1>

            <div v-if="dataTable" class="w-full">
                <div class="relative mb-4">
                    
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
                    
                    <div class=" mt-4">
                        <EasyDataTable
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

            <div v-else class="p-5 text-center text-gray-500">
                <div class="text-center flex gap-x-3 items-center justify-center">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p>
                        Loading device data...
                    </p>
                </div>
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