<template lang="">
    <div class="flex flex-col flex-nowrap justify-center items-start h-dvh px-40">
        <h1 class="font-sans text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-12">Perfil Individual</h1>
        <div class="flex flex-row flex-nowrap justify-around w-full">

            <div name="userInformationCard" class="bg-gray-100 rounded-lg shadow-lg p-6 text-2xl [&>strong]:font-bold text-gray-700 text-left">
                
                <!-- Iteramos sobre las propiedades usando Object.entries -->
                <div v-for="[key, value] in Object.entries(locationInfo)" 
                    :key="key"
                    >
                    <p>
                        <strong>
                            {{ key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') }}:
                        </strong>                        
                        {{ value === null ? 'No disponible' : value }}
                    </p>
                </div>
            </div>

            <div>
                <div class="mb-12">
                    <select name="distance">
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                    </select>
                </div>
                <div class="bg-gray-100 rounded-lg shadow-lg p-6 w-72">
                    <Map />
                </div>
            </div>

        </div>
        {{ locationInfo }}
    </div>
</template>



<script setup lang="ts">
    import { useRuntimeConfig } from '#app'
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import Map from '~/components/GoogleMapView.vue'

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

    console.log('ID de ubicación:', locationId) 

    // Aquí puedes agregar la lógica para cargar los detalles de la ubicación
    const loadLocationDetails = async () => {
        try {
            const response = await axios.get(`${apiBase}/locations/${locationId}`)
            locationInfo.value = response.data;
        } catch (error) {
            console.error('Error al cargar los detalles:', error)
        }
    }
    onMounted(() => {
        loadLocationDetails()
    })
</script>
