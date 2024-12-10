<template>
    <div class="flex flex-col flex-nowrap justify-center items-start h-dvh px-40">
        <h1 class="font-sans text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-12">
            Dispositivo Sigfox
        </h1>
        <div class="flex flex-row flex-nowrap justify-around w-full">
            <!-- Información básica del dispositivo -->
            <div class="bg-gray-100 rounded-lg shadow-lg p-6 text-2xl text-gray-700 text-left">
                <div v-if="deviceInfo">
                    <p><strong>Friendly Name: </strong>{{ deviceInfo.friendlyName }}</p>
                    <p><strong>Sigfox ID: </strong>{{ deviceInfo.SigfoxId }}</p>
                    <p><strong>Device Type: </strong>{{ deviceInfo.deviceType }}</p>
                    <p><strong>Last Update: </strong>{{ formatDate(deviceInfo.lastLocationUpdate) }}</p>
                </div>
                <div v-else>
                    <p>Cargando datos...</p>
                </div>
            </div>

            <!-- Mapa -->
            <div>
                <div class="bg-gray-100 rounded-lg shadow-lg p-6 w-72">
                    <Map 
                        v-if="deviceInfo && deviceInfo.lastLatitude && deviceInfo.lastLongitude"
                        :latitude="Number(deviceInfo.lastLatitude)"
                        :longitude="Number(deviceInfo.lastLongitude)"
                        :radius="2000"
                    />
                    <div v-else>
                        No hay información de ubicación disponible
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabla de mensajes -->
        <div class="w-full mt-8">
            <h2 class="text-2xl font-bold mb-4">Mensajes del Dispositivo</h2>
            <EasyDataTable
                v-if="deviceInfo"
                :headers="messageHeaders"
                :items="deviceInfo.messages"
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

<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Map from '~/components/GoogleMapView.vue'
import type { Header } from "vue3-easy-data-table"

// ... tus interfaces ...

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const route = useRoute()
const deviceId = route.params.id as string

const deviceInfo = ref<SigfoxDevice | null>(null)
const isLoading = ref(false)
const searchValue = ref('')
const itemsPerPage = ref(10)

// Headers para la tabla de mensajes
const messageHeaders: Header[] = [
    { text: "Fecha", value: "createdAt", sortable: true },
    { text: "Tipo", value: "messageType" },
    { text: "Data", value: "data" },
    { text: "LQI", value: "lqi" },
    { text: "Operador", value: "operatorName" },
    { text: "Latitud", value: "computedLocation.lat" },
    { text: "Longitud", value: "computedLocation.lng" },
    { text: "Radio", value: "computedLocation.radius" }
]

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

const loadDeviceDetails = async () => {
    isLoading.value = true
    try {
        const response = await axios.get(`${apiBase}/devices/${deviceId}`)
        deviceInfo.value = response.data
    } catch (error) {
        console.error('Error al cargar los detalles del dispositivo:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadDeviceDetails()
})
</script>

<style scoped>
:deep(.vue3-easy-data-table__tbody tr) {
    cursor: pointer;
}

:deep(.vue3-easy-data-table__tbody tr:hover) {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>