<template lang="">
    <Navbar/>
    <div class="grid grid-cols-3 px-40 gap-x-10 pb-10 font-sans grid-flow-row">
        <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl self-center col-span-3 mb-10">Device</h1>
        <div name="userInformationCard" class="bg-gray-100 rounded-lg shadow-lg [&>strong]:font-bold text-gray-700 text-left row-start-2 row-span-3 overflow-hidden h-min">

            <!-- Información básica del dispositivo -->
            <h2 class="tracking-wider leading-tight font-semibold text-gray-100 bg-gray-700 py-5 text-center text-2xl">Information</h2>
            <div class="py-8 px-6 [&>div>p]:leading-10 [&>div>p]:text-lg">
                <div v-if="deviceInfo">
                    <p><strong>Name: </strong>{{ deviceInfo.friendlyName }}</p>
                    <p><strong>Sigfox ID: </strong>{{ deviceInfo.SigfoxId }}</p>
                    <p><strong>Device Type: </strong>{{ deviceInfo.deviceType }}</p>
                    <p><strong>Last Update: </strong>{{ formatDate(deviceInfo.messages[0].createdAt) }}</p>
                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </div>
        </div>
         <!-- Mapa -->
        <div class="row-span-3 col-span-2 w-full">
            <div class="bg-gray-100 rounded-lg shadow-lg p-6 overflow-hidden h-[calc(60vh-50px)]">
                <Map 
                    v-if="deviceInfo && deviceInfo.lastLatitude && deviceInfo.lastLongitude"
                    :latitude="Number(deviceInfo.lastLatitude)"
                    :longitude="Number(deviceInfo.lastLongitude)"
                    :radius="2000"
                />
                <div v-else>
                    No hay información de dispositivos disponible
                </div>
            </div>
        </div>
        <!-- Tabla de mensajes -->
        <div class="col-span-3 row-span-2 mt-10 bg-gray-100 rounded-lg shadow-lg text-gray-700 overflow-hidden h-min">
            <h2 class="tracking-wider leading-tight font-semibold text-gray-100 bg-gray-700 py-5 text-center text-2xl">Messages</h2>
            <EasyDataTable
                v-if="deviceInfo"
                :headers="messageHeaders"
                :items="messagesHistory"
                :search-value="searchValue"
                :loading="isLoading"
                :items-per-page="itemsPerPage"
                :rows-items="[5,10,15,20]"
                :rows-per-page="10"
                alternating
                buttons-pagination
                show-index
            >
                <template #header="header">
                    <p class="text-gray-700 text-base">
                        {{ header.text }}
                    </p>
                </template>
            </EasyDataTable>
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
    import Navbar from '~/components/Navbar.vue'

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    const route = useRoute()
    const deviceId = route.params.id as string

    const deviceInfo = ref<SigfoxDevice | null>(null)
    const isLoading = ref(false)
    const messagesHistory = ref()
    const searchValue = ref('')
    const itemsPerPage = ref(10)

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
            const response = await axios.get(`${apiBase}/devices/${deviceId}`);
            deviceInfo.value = response.data;
            formatMessagesHistory()
        } catch (error) {
            console.error('Error al cargar los detalles del dispositivo:', error);
        } finally {
            isLoading.value = false;
        }
    }

    const formatMessagesHistory = () => {   
        messagesHistory.value = deviceInfo.value.messages;

        // Función auxiliar para convertir fecha a timestamp
        const getTimestamp = (dateString: string) => new Date(dateString).getTime();

        messagesHistory.value = deviceInfo.value.messages
            .sort((a: any, b: any) => {
                const dateA = getTimestamp(a.createdAt);
                const dateB = getTimestamp(b.createdAt);
                return dateB - dateA; // Ordenamiento descendente
            })
            .map((device: any) => ({
                ...device,
                createdAt: formatDate(device.createdAt),
                updatedAt: formatDate(device.updatedAt),
            }));
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
:deep(.vue3-easy-data-table__body td){
    --easy-table-body-row-font-size:1.2em;
    --easy-table-body-row-height:60px;
    --easy-table-body-row-font-color:#374151;
    font-size:var(--easy-table-body-row-font-size);
    height:var(--easy-table-body-row-height);
    color:var(--easy-table-body-row-font-color);
}
</style>