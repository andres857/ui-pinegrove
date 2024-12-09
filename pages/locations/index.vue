<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useRuntimeConfig } from '#app'

    import type { Header, Item } from "vue3-easy-data-table";


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

    const searchValue = ref('')
    // Variables para la paginación
    const itemsPerPage = ref(10)
    const serverItemsLength = ref(0) // Total de items si usas paginación del servidor


    // Creamos las referencias reactivas necesarias
    const locations = ref<Location[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

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
    
    // Cargamos los datos cuando el componente se monta
    onMounted(() => {
        fetchLocations()
    })
</script>

<template>
    <div class="bg-slate-200 flex w-full min-h-screen justify-center items-center">
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <div>
            <h4>Ubicaciones</h4>
        </div>
        <div>
            <div class="mb-4">
                <input
                    v-model="searchValue"
                    class="p-2 border rounded"
                    placeholder="Buscar ubicaciones..."
                />
            </div>
        </div>
        <div>
            <EasyDataTable
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
</template>