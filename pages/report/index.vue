<template>
    <EasyDataTable
      :headers="headers"
      :items="locations"
      @expand-row="loadIntroduction"
    >
      <template #expand="item">

        <div
          v-if="item.introduction"
          style="padding:25px 15px"
        >
            
            <EasyDataTable
            :headers="deviceHeaders"
            :items="formatDevicesForTable(item.devices)"
            />
            

        </div>
      </template>
    </EasyDataTable>
    <div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { useRuntimeConfig } from '#app'
    import { ref } from "vue";
    import axios from 'axios'
    import type { Header, Item } from "vue3-easy-data-table";

    import type { SigfoxDevice } from '~/components/types/index'

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
        { text: 'Location', value: 'location' },
        { text: 'Micro base station ', value: 'mbs' },
        { text: 'Devices at the location ', value: 'associated_devices' },
        { text: 'City ', value: 'city' },
        { text: 'Province ', value: 'province' },
        { text: 'Address ', value: 'address' },
        { text: 'Radius ', value: 'radius' },
    ];

    // Headers para la tabla de devices
    const deviceHeaders: Header[] = [
        { text: 'Device ID', value: 'id' },
        { text: 'Index', value: 'index' }
    ];

    const locations = ref<Location[]>([])
    const devices = ref<SigfoxDevice[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Función para obtener las ubicaciones
    const fetchReport = async () => {
        isLoading.value = true
        error.value = null        
        try {
            const response = await axios.get<Location[]>(`${apiBase}/locations/report/51742590-5703-4a34-a2ba-f8a7bc863981`)
            locations.value = response.data
            console.log(response.data);
        } catch (e) {
            error.value = 'Error al cargar las ubicaciones'
            console.error('Error fetching locations:', e)
        } finally {
            isLoading.value = false
        }
    }

    const fetchDevices = async (id: any) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await axios.get<SigfoxDevice>(`${apiBase}/devices/${id}`)
            devices.value = response.data;
            // formatMessagesHistory();
        } catch (e) {
            error.value = 'Error al cargar los dispositivos'
            console.error('Error fetching devices:', e)
        } finally {
            isLoading.value = false
        }
    }

    // Función para formatear los devices para la tabla anidada
    const formatDevicesForTable = (devices: string[]) => {
        return devices.map((deviceId, index) => ({
            id: deviceId,
            index: index + 1
        }));
    };

    const loadIntroduction = async (index: number): Promise<void> => {
        const expandedItem = locations.value[index];
        if (!expandedItem.introduction) {
            expandedItem.expandLoading = true;
            // Aquí simplemente asignamos los devices al introduction para que se muestre
            expandedItem.introduction = expandedItem.devices;
            expandedItem.expandLoading = false;
        }
    };


//     const formatDate = (dateString: string | null): string => {
//     if (!dateString) return 'No disponible';
//     return new Date(dateString).toLocaleString('es-ES', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: false
//     });
//   }

    // const formatMessagesHistory = () => {
    //     if (!devices.value) return;

    //     // Función auxiliar para convertir fecha a timestamp
    //     const getTimestamp = (dateString: string) => new Date(dateString).getTime();

    //     dataTable.value = devices.value
    //         // Ordenamos los dispositivos por lastLocationUpdate
    //         .sort((a: SigfoxDevice, b: SigfoxDevice) => {
    //             // Convertimos las fechas a timestamps para una comparación correcta
    //             const dateA = getTimestamp(a.lastLocationUpdate);
    //             const dateB = getTimestamp(b.lastLocationUpdate);
    //             return dateB - dateA; // Ordenamiento descendente
    //         })
    //         // Luego formateamos las fechas
    //         .map((device: SigfoxDevice) => ({
    //             ...device,
    //             // Formateamos lastLocationUpdate para la visualización
    //             lastLocationUpdate: formatDate(device.lastLocationUpdate)
    //         }));
    // }

    onMounted(() => {
        fetchReport()
    })
  </script>