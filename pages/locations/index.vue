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
        { text: "Nombre", value: "name" },
        { text: "Latitud", value: "latitude"},
        { text: "Longitud", value: "longitude"},
        { text: "Radio", value: "radiusMeters"},
        { text: "Descripcion", value: "description"},
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
            <EasyDataTable
            :headers="headers"
            :items="locations"
            :loading="isLoading"
            alternating
            buttons-pagination
            show-index
        />
        </div>

    </div>
</template>