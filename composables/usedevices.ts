import { ref } from 'vue'
import {useApi} from '~/composables/useApi'
import type { SigfoxDevice } from '~/types/device'
import type { LocationHistoryInterfaz } from '~/types/location'
import { formatDevicesData, formatMessagesHistory } from '~/utils/device'

export const useDevices = (clientId?: string) => {
    
    if (!clientId) {
        throw new Error('clientId is required')
    }
    
    const { get, isLoading, error } = useApi()
    const device = ref<SigfoxDevice | null>(null)
    const devices = ref<SigfoxDevice[]>([])
    const dataTable = ref<any[]>([])
    const dataFormatted =  ref<any[]>([])

    const fetchDevices = async ()=>{

        try {
            const response = await get<SigfoxDevice[]>(`/devices/client/${clientId}`)            
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
        } catch (e) {
            error.value = 'Error al cargar los dispositivos'
            console.error('Error fetching devices:', e)
        } finally {
            isLoading.value = false
        }
    }

    const getDeviceById = async (deviceId: string) => {
        let lastlocations = null
        if (!deviceId) {
            throw new Error('deviceId is required')
        }
        const { get, isLoading, error } = useApi()

        try {
            const response = await get<SigfoxDevice>(`/devices/${deviceId}`)
            device.value = response.data;
            console.log('Device Composable:', device.value);
            lastlocations = formatMessagesHistory(device.value);
        } catch (e) {
            error.value = 'Error al cargar los detalles del dispositivo', e
            console.error('Error loading device details:', error);
        } finally {
            isLoading.value = false;
        }
        return lastlocations;
    };

    return {
        device,
        devices,
        dataTable,
        dataFormatted,
        isLoading,
        error,
        getDeviceById,
        fetchDevices,
    }
}
  