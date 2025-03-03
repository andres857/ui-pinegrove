<template>
    <Navbar/>
    <div class="grid grid-cols-12 px-40 gap-y-2 pb-10 font-sans grid-flow-row">
        
        <h3 class="text-2xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-4xl self-center col-span-3 mb-7">Device</h3>
        
        <!-- device information -->
        <div class="col-span-12 bg-gray-700 rounded-lg shadow-lg [&>strong]:font-bold text-gray-100 text-left overflow-hidden w-full h-min mb-5">
            <div class="py-2 px-6 [&>div>p]:leading-10 [&>div>p]:text-lg">
                <div v-if="deviceInfo" class="flex items-center gap-4">
                    <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="8" fill="#008000"/>
                    </svg>
                    <p><strong>Device ID: </strong>{{ deviceInfo.SigfoxId }}</p>
                    <p><strong>Type: </strong> Carter Braccio </p>
                    <p><strong>Container: </strong> 214 </p>
                    <p><strong>Last Update: </strong>{{ formatDate(deviceInfo.messages[0].createdAt) }}</p>
                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </div>
        </div>

        <!-- search block -->
        <div class=" col-span-12">
            <div class=" w-full flex justify-end mb-4">
                <div id="date-range-picker" date-rangepicker class="flex items-center">
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input id="datepicker-range-start" name="start" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start">
                    </div>
                    <span class="mx-4 text-gray-500">to</span>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input id="datepicker-range-end" name="end" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end">
                    </div>
                </div>
            </div>
        </div>


        <div class="h-[70vh] col-span-12 grid grid-cols-12 gap-4">

            <!-- Timeline -->
            <div class=" col-span-3 gap-4 p-5 bg-slate-500 h-[90%]">
                <!-- Contenedor scrolleable con altura fija -->
                <div class="overflow-y-auto custom-scrollbar p-5">
                    <ol class="relative border-s border-gray-300">                  
                        <li 
                            v-for="(location, index) in locationHistory" 
                            :key="index" 
                            class="mb-10 ms-6 cursor-pointer" 
                            @click="setActiveLocation(index)"
                        >
                            <span 
                                class="absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white"
                                :class="getStatusClass(location.status)"
                            >
                                <svg :fill="getStatusColor(location.status)" height="20px" width="20px" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 434.174 434.174" xml:space="preserve">
                                    <g>
                                        <path d="M217.087,119.397c-24.813,0-45,20.187-45,45s20.187,45,45,45s45-20.187,45-45S241.901,119.397,217.087,119.397z"/>
                                        <path d="M217.087,0c-91.874,0-166.62,74.745-166.62,166.619c0,38.93,13.421,74.781,35.878,103.177l130.742,164.378l130.742-164.378
                                            c22.457-28.396,35.878-64.247,35.878-103.177C383.707,74.745,308.961,0,217.087,0z M217.087,239.397c-41.355,0-75-33.645-75-75
                                            s33.645-75,75-75s75,33.645,75,75S258.443,239.397,217.087,239.397z"/>
                                    </g>
                                </svg>
                            </span>
                            <h3 class="mb-1 text-lg font-semibold text-gray-900" :class="{'font-bold': activeLocationIndex === index}">
                                {{ location.label }}
                            </h3>
                            <time class="block mb-2 text-sm font-normal leading-none text-gray-400">
                                {{ location.time }}
                            </time>
                        </li>
                    </ol>
                </div>
                <!-- Indicador de scroll opcional -->
                <div v-if="locationHistory.length > 5" class="text-center text-xs text-gray-500 h-[10%]">
                    <p>Scroll to see more locations</p>
                </div>
            </div>

            <!-- Map -->
            <div class=" col-span-9 w-full h-[90%]">
                <div class="bg-gray-100 rounded-lg shadow-lg p-6 overflow-hidden h-full">
                    <Map 
                        v-if="locationHistory.length > 0"
                        :locations="locationHistory"
                        :active-index="activeLocationIndex"
                        :show-radius-circles="false"
                        @marker-click="setActiveLocation"
                    />
                    <div v-else>
                        No location information available
                    </div>
                </div>
            </div>

        </div>

        <!-- Message Table -->
        <div class="col-span-12 row-span-2 mt-10 bg-gray-100 rounded-lg shadow-lg text-gray-700 overflow-hidden h-min">
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
                @click:row="handleRowClick"
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
    import { ref, onMounted, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import Map from '~/components/MapMultipleLocations.vue'
    import type { Header } from "vue3-easy-data-table"
    import Navbar from '~/components/Navbar.vue'
    import type { SigfoxDevice } from '~/components/types/index'

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    const route = useRoute()
    const deviceId = route.params.id as string

    const deviceInfo = ref<SigfoxDevice | null>(null)
    const isLoading = ref(false)
    const messagesHistory = ref([])
    const searchValue = ref('')
    const itemsPerPage = ref(10)
    const activeLocationIndex = ref(0)

    // Status definitions for timeline and markers
    const locationStatuses = [
        { value: 'origin', label: 'Origin', color: '#00AA55', bgClass: 'bg-green-100' },
        { value: 'intransit', label: 'In transit', color: '#88C700', bgClass: 'bg-green-100' },
        { value: 'warning', label: 'Warning', color: '#FFAA00', bgClass: 'bg-yellow-100' },
        { value: 'alert', label: 'Alert', color: '#FF5555', bgClass: 'bg-red-100' }
    ]

    const messageHeaders: Header[] = [
        { text: "Date", value: "createdAt", sortable: true },
        { text: "Location", value: "" },
        { text: "Latitude", value: "computedLocation.lat" },
        { text: "Longitude", value: "computedLocation.lng" },
    ]

    // Compute location history from messages
    const locationHistory = computed(() => {
        if (!deviceInfo.value || !deviceInfo.value.messages || deviceInfo.value.messages.length === 0) {
            return [];
        }

        // Get last 10 messages with location data
        return deviceInfo.value.messages
            .filter(msg => msg.computedLocation && msg.computedLocation.lat && msg.computedLocation.lng)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 10)
            .map((msg, index) => {
                // Determine status based on index (you can use your own logic here)
                const statusIndex = Math.min(index, locationStatuses.length - 1);
                const status = locationStatuses[statusIndex];
                
                return {
                    lat: Number(msg.computedLocation.lat),
                    lng: Number(msg.computedLocation.lng),
                    radius: Number(msg.computedLocation.radius) || 1000,
                    time: formatDate(msg.createdAt),
                    status: status.value,
                    label: index === 0 ? 'Latest Position' : status.label,
                    messageId: msg.id // Store message ID for reference
                };
            });
    });

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return 'Not available';
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
        isLoading.value = true;
        try {
            const response = await axios.get(`${apiBase}/devices/${deviceId}`);
            deviceInfo.value = response.data;
            formatMessagesHistory();
        } catch (error) {
            console.error('Error loading device details:', error);
        } finally {
            isLoading.value = false;
        }
    }

    const formatMessagesHistory = () => {
        if (!deviceInfo.value || !deviceInfo.value.messages) {
            messagesHistory.value = [];
            return;
        }

        // Sort messages by date (newest first)
        messagesHistory.value = deviceInfo.value.messages
            .sort((a: any, b: any) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateB - dateA; // Descending order
            })
            .map((message: any) => ({
                ...message,
                createdAt: formatDate(message.createdAt),
                updatedAt: formatDate(message.updatedAt),
                // Format nested properties for the data table
                'computedLocation.lat': message.computedLocation?.lat || 'N/A',
                'computedLocation.lng': message.computedLocation?.lng || 'N/A',
                'computedLocation.radius': message.computedLocation?.radius || 'N/A',
            }));
    }

    // Get status color for timeline icons
    const getStatusColor = (status) => {
        const found = locationStatuses.find(s => s.value === status);
        return found ? found.color : '#888888';
    };

    // Get status class for timeline icons
    const getStatusClass = (status) => {
        const found = locationStatuses.find(s => s.value === status);
        return found ? found.bgClass : 'bg-gray-100';
    };

    // Set active location
    const setActiveLocation = (index) => {
        activeLocationIndex.value = index;
    };

    // Handle table row click to highlight corresponding location
    const handleRowClick = (item) => {
        // Find the index in locationHistory that corresponds to this message
        const index = locationHistory.value.findIndex(loc => loc.messageId === item.id);
        if (index !== -1) {
            setActiveLocation(index);
        }
    };

    onMounted(() => {
        loadDeviceDetails();
    });
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

    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }
</style>