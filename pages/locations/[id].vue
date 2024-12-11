<template lang="">
    <Navbar/>
    <div class="grid grid-cols-3 px-40 gap-x-10 pb-10 font-sans">
        <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl self-center col-span-3 mb-10">Ubication</h1>
        <div name="userInformationCard" class="bg-gray-100 rounded-lg shadow-lg [&>strong]:font-bold text-gray-700 text-left row-start-2 row-span-4 overflow-hidden h-min">

            <!-- Iteramos sobre las propiedades usando Object.entries -->
            <h2 class="tracking-wider leading-tight font-semibold text-gray-100 bg-gray-700 py-5 text-center text-2xl">Information</h2>
            <div class="py-8 px-6 [&>div>p]:leading-10 [&>div>p]:text-lg">
                <div v-if='locationInfoPrint' v-for="[key, value] in Object.entries(locationInfoPrint)" 
                    :key="key"
                    >
                    <p>
                        <strong>
                            {{ key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') }}:
                        </strong>                        
                        {{ value === null ? 'No disponible' : value }}
                    </p>
                </div>
                <div v-else> 
                    <p>Cargando datos</p>
                </div>
            </div>
        </div>
        <div class="grid auto-rows-max row-span-4 col-span-2 w-full">
            <div class="flex flex-row justify-self-end items-center gap-x-6 mb-5 h-fit">
                <h3 class="text-xl font-semibold tracking-wider leading-tight text-gray-700">Radius Meters: </h3>
                <select name="distance" class="appearance-none bg-gray-100 border-none text-gray-700 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 p-4 [&>option]:text-gray-700 [&>option]:bg-gray-100">
                    <option disabled selected>Select Radius</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="5000">5000</option>
                    <option value="10000">10000</option>
                </select>
            </div>
            <div class="bg-gray-100 rounded-lg shadow-lg p-6 overflow-hidden h-[calc(60vh-50px)]">
                <Map 
                v-if="locationInfo"
                :latitude="Number(locationInfo.latitude)" 
                :longitude="Number(locationInfo.longitude)"
                :radius="Number(locationInfo.radiusMeters)"
                />

                <!-- Puedes mostrar un mensaje de carga mientras no haya datos -->
                <div v-else>
                Cargando información de la ubicación...
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRuntimeConfig } from '#app'
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    import Map from '~/components/GoogleMapView.vue'
    import Id from '../devices/[id].vue'
    import Navbar from '~/components/Navbar.vue'

    // Definimos la interfaz para tipar los datos
    interface LocationDetail {
        id: string;
        name: string;
        address: string;
        country: string;
        city: string;
        province: string;
        microbs: string;
        zip: number;
        latitude: string;
        longitude: string;
        radiusMeters: number;
        notes: string | null;
        clientId: string | null;
        client: any | null;
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    const route = useRoute()
    const locationId = route.params.id as string

    const locationInfo = ref<LocationDetail | null>(null)

    let locationInfoPrint = {}

    console.log('ID de ubicación:', locationId)

    // Aquí puedes agregar la lógica para cargar los detalles de la ubicación
    const loadLocationDetails = async () => {
        try {
            const response = await axios.get(`${apiBase}/locations/${locationId}`)
            locationInfo.value = response.data;
            locationInfoPrint = {...locationInfo.value}
            delete locationInfoPrint.id
            delete locationInfoPrint.clientId
            delete locationInfoPrint.client
        } catch (error) {
            console.error('Error al cargar los detalles:', error)
        }
    }
    onMounted(() => {
        loadLocationDetails()
    })
</script>
