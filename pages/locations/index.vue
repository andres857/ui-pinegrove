<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRuntimeConfig } from '#app'
    import { useRouter } from 'vue-router'
    import type { Header, Item, ClickRowArgument } from "vue3-easy-data-table";
    import Navbar from '~/components/Navbar.vue';
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

    const headers: Header[] = [
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
            locations.value = response.data
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
            const response = await axios.get<Location[]>(`${apiBase}/devices/client/51742590-5703-4a34-a2ba-f8a7bc863981`)
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

    
    // Cargamos los datos cuando el componente se monta
    onMounted(() => {
        fetchLocations()
        fetchDevices()
    })
</script>

<template>
    <div>
        <Navbar/>
        <div class="grid gap-y-4 px-40">
            <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-10">Locations</h1>

            <!-- Contenedor del mapa -->
            <div class="w-full h-[800px] mb-8 rounded-lg overflow-hidden shadow-lg">
                <MultipleLocationsMap 
                    :locations="locations"
                    :devices="devices"
                    @location-click="handleLocationClick"
                    @device-click="handleDeviceClick"
                />
            </div>
            
            <div class="flex flex-row justify-between">   
                <div class="relative">
                    <input
                        v-model="searchValue"
                        class="px-5 py-3 pl-10 text-gray-700 placeholder-gray-400 bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-full"
                        placeholder="Search location..."
                    />
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <button class="rounded-lg px-8 py-2 bg-gray-700 text-gray-100 hover:bg-gray-800 duration-300">Crear</button>
            </div>
            <div class="w-full mt-5"> 
                <EasyDataTable
                    @click-row="handleRowClick"
                    :headers="headers"
                    :items="locations"
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