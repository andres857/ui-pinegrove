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
                    <p><strong>Device ID: </strong>{{ deviceInfo[0]?.device?.SigfoxId || 'N/A' }}</p>
                    <p><strong>Type: </strong> {{ deviceInfo[0]?.device?.aliasDeviceType || 'N/A' }} </p>
                    <p><strong>Container: </strong> {{ deviceInfo[0]?.device?.friendlyName || 'N/A' }} </p>
                    <p><strong>Last Update: </strong>{{ formatDate(deviceInfo[0]?.timestamp) }}</p>
                    
                    <!-- Usar el modal con el icono como trigger -->
                    <!-- Usar el modal con el icono como trigger -->
                    <div>
                        <ModalToggle ref="deviceModal" title="Edit Device Information">
                            <template #trigger>
                                <button>
                                    <svg class="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#ffffff"/>
                                    </svg>
                                </button>
                            </template>
                            
                            <!-- Contenido del modal - Formulario para editar el dispositivo -->
                            <form @submit.prevent="updateDevice">
                                <div class="space-y-4">
                                    <!-- Friendly Name -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Container Name</label>
                                        <input 
                                            v-model="editedDevice.friendlyName" 
                                            type="text" 
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                                        />
                                    </div>
                                    
                                    <!-- Device Type Alias -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Device Type</label>
                                        <input 
                                            v-model="editedDevice.aliasDeviceType" 
                                            type="text" 
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                                        />
                                    </div>
                                </div>
                                
                                <!-- Buttons -->
                                <div class="mt-6 flex justify-end space-x-3">
                                    <button 
                                        type="button" 
                                        @click="$refs.deviceModal.closeModal()" 
                                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-[#374151] hover:bg-[#5c6c86] hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#374151] hover:bg-[#5c6c86] hover:text-white"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </ModalToggle>
                    </div>

                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </div>
        </div>

                           
        <!-- search block -->
        <!-- <div class=" col-span-12">
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
        </div> -->


        <div class="h-[70vh] col-span-12 grid grid-cols-12 gap-4">

            <!-- Timeline -->
            <div class="col-span-3 gap-4 p-5 h-[90%]">
                <div class="overflow-y-auto custom-scrollbar p-5">
                    <!-- {{ locationHistory }} -->
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

        <!-- ubications Table -->
        <div class="col-span-6 row-span-2 mt-10 bg-gray-100 rounded-lg shadow-lg text-gray-700 overflow-hidden h-min">
            <h2 class="tracking-wider leading-tight font-semibold text-gray-100 bg-gray-700 py-5 text-center text-2xl">Ubications</h2>
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
    import { ref, onMounted, computed, reactive, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import Map from '~/components/MapMultipleLocations.vue'
    import type { Header } from "vue3-easy-data-table"
    import Navbar from '~/components/Navbar.vue'
    import ModalToggle from '~/components/ModalToggle.vue'
    
    // Updated type definition for new API response
    interface DeviceLocation {
        id: string;
        latitude: string;
        longitude: string;
        locationName: string;
        timestamp: string;
        device: {
            deviceId: string;
            SigfoxId: string;
            deviceType: string;
            lastLatitude: string;
            lastLongitude: string;
            lastLocationUpdate: string;
            [key: string]: any;
        };
        location: {
            id: string;
            name: string;
            address: string;
            country: string;
            city: string;
            radiusMeters: number;
            [key: string]: any;
        };
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    const route = useRoute()
    const deviceId = route.params.id as string

    // Updated ref type for the new API response format
    const deviceInfo = ref<DeviceLocation[] | null>(null)
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

    // Updated headers to show location name instead of coordinates
    const messageHeaders: Header[] = [
        { text: "Date", value: "timestamp", sortable: true },
        { text: "Location", value: "locationName" },
        // { text: "Lat", value: "latitude" },
        // { text: "Long", value: "longitude" }
    ]

    // Para manejar la edición del dispositivo
    const deviceModal = ref(null);
    const editedDevice = reactive({
        deviceId: '',
        friendlyName: '',
        aliasDeviceType: '',
        SigfoxId: ''
    });

    // Función para preparar la edición cuando se abra el modal
    const prepareEditDevice = () => {
        if (deviceInfo.value && deviceInfo.value[0]?.device) {
            editedDevice.deviceId = deviceInfo.value[0].device.SigfoxId;
            editedDevice.friendlyName = deviceInfo.value[0].device.friendlyName || '';
            editedDevice.aliasDeviceType = deviceInfo.value[0].device.aliasDeviceType || '';
            editedDevice.SigfoxId = deviceInfo.value[0].device.SigfoxId;
        }
    };

    // Escuchar cuando se abre el modal para cargar los datos
    watch(() => deviceModal.value?.isOpen, (isOpen) => {
        if (isOpen) {
            prepareEditDevice();
        }
    });

    // Función para enviar los cambios al servidor
    const updateDevice = async () => {
        try {
            // Actualizar los datos localmente primero
            if (deviceInfo.value && deviceInfo.value[0]?.device) {
                deviceInfo.value[0].device.friendlyName = editedDevice.friendlyName;
                deviceInfo.value[0].device.aliasDeviceType = editedDevice.aliasDeviceType;
            }
            
            // Enviar los cambios al servidor
            const response = await axios.put(`${apiBase}/devices/${editedDevice.deviceId}`, {
                friendlyName: editedDevice.friendlyName,
                aliasDeviceType: editedDevice.aliasDeviceType
            });
            
            if (response.status === 200 || response.status === 204) {
                // Éxito - cerrar el modal
                deviceModal.value?.closeModal();
                // Opcional: mostrar un mensaje de éxito
                console.log('Dispositivo actualizado correctamente');
            } else {
                console.error('Error al actualizar dispositivo:', response);
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            // Opcional: mostrar un mensaje de error al usuario
        }
    };

    // Compute location history from the new API response format
    const locationHistory = computed(() => {
        if (!deviceInfo.value || deviceInfo.value.length === 0) {
            return [];
        }

        // Use the new data structure to create location history
        return deviceInfo.value
            .filter(loc => loc.latitude && loc.longitude)
            .slice(0, 10)
            .map((loc, index) => {
                // Determine status based on locationName or index
                let statusValue = 'origin';
                if (loc.locationName.toLowerCase().includes('transit')) {
                    statusValue = 'intransit';
                } else if (index > 5) {
                    statusValue = 'alert';
                } else if (index > 2) {
                    statusValue = 'warning';
                }
                
                const status = locationStatuses.find(s => s.value === statusValue) || locationStatuses[0];
                
                return {
                    lat: loc.locationName == 'In transit' ? Number(loc.latitude) : Number(loc.location.latitude),
                    lng: loc.locationName == 'In transit' ? Number(loc.longitude) : Number(loc.location.longitude),
                    radius: loc.location?.radiusMeters || 1000,
                    time: formatDate(loc.timestamp),
                    status: statusValue,
                    label: index === 0 ? 'Latest Position: ' + loc.locationName : loc.locationName,
                    messageId: loc.id 
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
            // Updated API endpoint
            const response = await axios.get(`${apiBase}/locations/history/device/${deviceId}`);
            console.log('Device details:', response.data);
            deviceInfo.value = response.data;
            formatMessagesHistory();
        } catch (error) {
            console.error('Error loading device details:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const formatMessagesHistory = () => {
        if (!deviceInfo.value || deviceInfo.value.length === 0) {
            messagesHistory.value = [];
            return;
        }

        // Format the device locations for the data table
        messagesHistory.value = deviceInfo.value
            .sort((a, b) => {
                const dateA = new Date(a.timestamp).getTime();
                const dateB = new Date(b.timestamp).getTime();
                return dateB - dateA; // Descending order (newest first)
            })
            .map((loc:any) => ({
                id: loc.id,
                timestamp: formatDate(loc.timestamp),
                locationName: loc.locationName,
                latitude: loc.locationName == 'In transit' ? loc.latitude : loc.location.latitude,
                longitude: loc.locationName == 'In transit' ? loc.longitude : loc.location.longitude,
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