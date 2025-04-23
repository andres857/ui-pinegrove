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
            lastlocations = formatMessagesHistory(device.value);
        } catch (e) {
            error.value = 'Error al cargar los detalles del dispositivo', e
            console.error('Error loading device details:', error);
        } finally {
            isLoading.value = false;
        }        
        return lastlocations;
    };

    const updateDeviceById = async (deviceId: string, friendlyName?:string, aliasDeviceType?:string ) => {
        let statusHttp = null
        if (!deviceId) {
            throw new Error('deviceId is required')
        }
        const { put, isLoading, error } = useApi()

        try {
            const response = await put<SigfoxDevice>(`/devices/${deviceId}`,{
                friendlyName: friendlyName,
                aliasDeviceType: aliasDeviceType
            })
            device.value = response.data;            
            statusHttp = response.status;
        } catch (e) {
            error.value = 'Error al actualizar el dispositivo', e
            console.error('Error uploading device details:', error);
        } finally {
            isLoading.value = false;
        }
        return statusHttp;
    };

    return {
        device,
        devices,
        dataTable,
        dataFormatted,
        isLoading,
        error,
        fetchDevices,
        getDeviceById,
        updateDeviceById
    }
}
  