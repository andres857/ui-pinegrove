import { ref } from 'vue'
import {useApi} from '~/composables/useApi'
import type { SigfoxDevice } from '~/types/device'
import type { LocationHistoryInterfaz } from '~/types/location'
import { formatDevicesData } from '~/utils/device'

export const useDevices = (clientId?: string) => {

    if (!clientId) {
        throw new Error('clientId is required')
    }

    const $api = useApi()
    const devices = ref<SigfoxDevice[]>([])
    const isLoading = ref(true)
    const dataTable = ref<any[]>([])
    const error = ref<string | null>(null)
    const dataFormatted =  ref<any[]>([])

    const fetchDevices = async ()=>{
        isLoading.value = true
        error.value = null
        // await new Promise(resolve => setTimeout(resolve, 3000)) // delay de 300ms

        try {
            const response = await $api.get<SigfoxDevice[]>(`/devices/client/${clientId}`)
            devices.value = response.data;

            const processedDevices = devices.value
                .map((device: any) => {
                    const defaultLocation: LocationHistoryInterfaz = {
                        id: device.SigfoxId,
                        latitude: null,
                        longitude: null,
                        locationName: 'not Available',
                        timestamp: null
                    };
                    device.locationHistory = device.locationHistory.sort((a, b) => {
                        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                    });
                    
                    return {
                        ...device,
                        lastLocation: device.locationHistory.length > 0 ? device.locationHistory[0] || defaultLocation : defaultLocation
                    };
                })    
            console.log('Devices composable', processedDevices);
            
            dataTable.value = processedDevices;
            dataFormatted.value = formatDevicesData(dataTable.value);
            // console.log('aaaaaaaaaaaaaaa',f);
            
        } catch (e) {
            error.value = 'Error al cargar los dispositivos'
            console.error('Error fetching devices:', e)
        } finally {
            isLoading.value = false
        }
    } 

    // Ejecuta el fetch al montar el composable
    onMounted(fetchDevices)

    return {
        devices,
        dataTable,
        dataFormatted,
        isLoading,
        error,
        refresh: fetchDevices,
    }
}
  