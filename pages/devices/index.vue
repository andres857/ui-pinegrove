<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRuntimeConfig } from '#app';
import { useRouter } from 'vue-router';
import type { Header } from "vue3-easy-data-table";
import Navbar from '~/components/Navbar.vue';

interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ComputedLocation {
    lat: number;
    lng: number;
    radius: number;
    source: number;
    status: number;
}

interface Duplicate {
    bsId: string;
    rssi: number;
    nbRep: number;
}

interface SigfoxMessage {
    id: string;
    messageType: string;
    data: string;
    lqi: string;
    linkQuality: string;
    operatorName: string;
    countryCode: string;
    duplicates: Duplicate[];
    computedLocation: ComputedLocation;
    createdAt: string;
}

interface SigfoxDevice {
    deviceId: string;
    friendlyName: string;
    SigfoxId: string;
    deviceType: string;
    deviceTypeId: string;
    lastLatitude: string;
    lastLongitude: string;
    lastLocationUpdate: string;
    client: Client;
    messages: SigfoxMessage[];
    locationHistory: any[]; // Puedes definir una interfaz específica si tienes la estructura
}

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const router = useRouter()

const searchValue = ref('')
const itemsPerPage = ref(10)
const serverItemsLength = ref(0)

const devices = ref<SigfoxDevice[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const headers: Header[] = [
    { text: "Name", value: "friendlyName" },
    { text: "Sigfox ID", value: "SigfoxId" },
    { text: "Device Type", value: "deviceType" },
    { text: "Last Latitude", value: "lastLatitude" },
    { text: "Last Longitude", value: "lastLongitude" },
    { text: "Last Update", value: "lastLocationUpdate" },
    // { text: "Client", value: "client.name" }
];

const fetchDevices = async () => {
    isLoading.value = true
    error.value = null
    try {
        const response = await axios.get<SigfoxDevice[]>(`${apiBase}/devices/`)
        devices.value = response.data
    } catch (e) {
        error.value = 'Error al cargar los dispositivos'
        console.error('Error fetching devices:', e)
    } finally {
        isLoading.value = false
    }
}

const handleRowClick = (item: SigfoxDevice) => {
    router.push({
        path: `/devices/${item.deviceId}`,
    });
}

onMounted(() => {
    fetchDevices()
})
</script>

<template>

    <Navbar/>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 flex justify-center">
            <h4>Devices</h4>
        </div>
        <div class="col-span-12 flex items-center justify-around gap-3">
            <input
                v-model="searchValue"
                class="p-2 border rounded"
                placeholder="Search device..."
            />
            <div>
                <button class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">
                    New
                </button>
            </div>
        </div>
        <div class="col-span-12 flex justify-center items-center">
            <div class="max-w-4xl w-full"> 
                <EasyDataTable
                    @click-row="handleRowClick"
                    :headers="headers"
                    :items="devices"
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