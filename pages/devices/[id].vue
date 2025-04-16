<template>
    <Navbar/>
    <div class="grid grid-cols-12 px-40 gap-y-2 pb-10 font-sans grid-flow-row">
        
        <h3 class="text-2xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-4xl self-center col-span-3 mb-7">Device</h3>
        
        <!-- device information -->
        <div class="col-span-12 bg-gray-700 rounded-lg shadow-lg [&>strong]:font-bold text-gray-100 text-left overflow-hidden w-full h-min mb-5">
            <div class="py-2 px-6 [&>div>p]:leading-10 [&>div>p]:text-lg">
                <div v-if="deviceInfo" class="flex items-center gap-4">
                    <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="8" :fill="deviceStatusColor" />
                    </svg>
                    <p><strong>Device ID: </strong>{{ deviceInfo?.SigfoxId || 'N/A' }}</p>
                    <p><strong>Type: </strong> {{ deviceInfo.aliasDeviceType || 'N/A' }} </p>
                    <p><strong>Container: </strong> {{ deviceInfo.friendlyName || 'N/A' }} </p>
                    <p><strong>Last Update: </strong>{{ formatDate(deviceInfo.lastLocationUpdate) }}</p>
                    
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
          
        <!-- search block (commented out) -->
        <div class=" col-span-12">
            <div class=" w-full flex justify-end mb-4 gap-x-3">
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
                <button
                    @click="handleDateSearch"
                    type="button"
                    class="px-4 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 
                        rounded-lg focus:ring-4 focus:ring-blue-200 focus:outline-none 
                        transition-colors duration-200 font-medium text-sm"
                >
                Search
                </button>
                <button
                    v-if="isFiltered"
                    @click="resetFilters"
                    type="button"
                    class="px-4 py-2.5 border border-red-600 text-red-600 hover:bg-red-50 
                        rounded-lg focus:ring-4 focus:ring-red-200 focus:outline-none 
                        transition-colors duration-200 font-medium text-sm"
                >
                    Clear Filters
                </button>
            </div>
        </div>

        <!-- Map and Timeline Container -->
        <div class="h-[70vh] col-span-12 grid grid-cols-12 gap-4 mb-10">
            <!-- Timeline -->
            <div class="col-span-3 bg-white rounded-lg shadow-sm p-5 flex flex-col h-full">
                <div class="flex justify-between items-center mb-3">
                    <h4 class="font-semibold text-gray-700">Device positions</h4>
                    <span v-if="isFiltered" class="text-sm text-blue-600">
                        ({{ messagesHistory.length }} filtered)
                    </span>
                </div>
                <div class="h-80 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <ul>                  
                        <li 
                            v-for="(location, index) in messagesHistory"
                            :key="index" 
                            class="cursor-pointer transition-all duration-300 py-2"
                            @click="setActiveLocation(index)"
                            :class="{
                            'bg-emerald-50 border-l-4 border-emerald-500 rounded-xl shadow-sm px-2 py-1': index === 0
                            }"
                        >
                            <div class=" flex gap-x-1">
                                <div class="flex items-start pt-1 space-x-2">
                                    <svg v-if="index === 0" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <svg v-else class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>

                                <div>
                                    <span
                                        v-if="index === 0"
                                        class="inline-block text-xs bg-emerald-100 text-emerald-600 px-1  rounded-full font-medium mb-1"
                                        >
                                        Latest Position
                                    </span>

                                    <!-- Título -->
                                    <h3 
                                        class="mb-1 text-lg font-semibold text-gray-900"
                                        :class="{ 'font-bold text-emerald-700': activeLocationIndex === index || index === 0 }"
                                        >
                                        {{ location.label }}
                                    </h3>

                                    <!-- Hora -->
                                    <time class="block mb-2 text-sm font-normal leading-none text-gray-400">
                                        {{ location.time }}
                                    </time>
                                </div>                                
                            </div>                            
                        </li>
                    </ul>
                </div>

                <!-- Card de ubicación seleccionada -->
                <div v-if="selectedLocation" class="mt-6 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-all duration-300">
                    <!-- Título con ícono -->
                    <div class="flex items-center gap-3 mb-4">
                        
                        <h2 class="text-lg font-semibold text-gray-800">Selected location</h2>
                    </div>

                    <!-- Datos -->
                    <div class="text-sm text-gray-700 space-y-1">
                        <p><span class="font-medium text-gray-600">Location:</span> {{ selectedLocation.locationName }}</p>
                        <p><span class="font-medium text-gray-600">Date:</span> {{ selectedLocation.time }}</p>
                    </div>
                </div>
            </div>

            <!-- Map -->
            <div class="col-span-9 w-full">
                <div class="bg-gray-100 rounded-lg shadow-lg p-6 overflow-hidden h-full">
                    <Map v-if="messagesHistory.length > 0"
                        :locations="locationHistory"
                        :active-index="activeLocationIndex"
                        :show-radius-circles="false"
                        @marker-click="setActiveLocation"
                    />
                    <div v-else class="flex items-center justify-center h-full text-gray-500">
                        No location information available
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRuntimeConfig } from '#app'
    import axios from 'axios'
    import { ref, onMounted, computed, reactive, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import Map from '~/components/MapMultipleLocations.vue'
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
    const deviceStatus = route.query.deviceStatus as string; // Accede al estado del dispositivo

    // Add computed property for device status color
    const deviceStatusColor = computed(() => {
        // If the deviceStatus is 'connected', show green, otherwise show red
        return deviceStatus === 'Connected' ? '#008000' : '#FF0000';
    });

    // Updated ref type for the new API response format
    const deviceInfo = ref<DeviceLocation[] | null>(null)
    const isLoading = ref(false)
    const messagesHistory = ref([])
    const activeLocationIndex = ref(0)

    const startDate = ref(null);
    const endDate = ref(null);
    const originalLocations = ref([]) // Nuevo: Guardar los datos originales
    const isFiltered = ref(false) // Nuevo: Estado para saber si hay filtros activos

    const selectedLocation = ref(null)


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
        return messagesHistory.value.map((loc: any, index: number) => {
            // console.log('Location:', loc);
            
            return {
                lat: Number(loc.latitude),
                lng: Number(loc.longitude),
                radius: loc.location?.radiusMeters || 5000,
                time: loc.timestamp,
                label: loc.locationName,
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
            const response = await axios.get(`${apiBase}/devices/${deviceId}`);
            deviceInfo.value = response.data;
            formatMessagesHistory();
        } catch (error) {
            console.error('Error loading device details:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const formatMessagesHistory = () => {
        if (!deviceInfo.value) return;
        
        // Tomar los últimos 10 registros y ordenarlos de más reciente a más antiguo
        const last10Locations = [...deviceInfo.value.locationHistory]
            .slice(-10)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        // Formatear las ubicaciones
        messagesHistory.value = last10Locations.map((loc: any, index: number) => {
            return {
                ...loc,
                label:  loc.locationName,
                time: formatDate(loc.timestamp),
            };
        });
    }

    // Función para restablecer los filtros
    const resetFilters = () => {
        // Limpiar los inputs de fecha
        const startInput = document.getElementById('datepicker-range-start') as HTMLInputElement;
        const endInput = document.getElementById('datepicker-range-end') as HTMLInputElement;
        if (startInput && endInput) {
            startInput.value = '';
            endInput.value = '';
        }
        
        // Restablecer variables reactivas
        startDate.value = null;
        endDate.value = null;
        isFiltered.value = false;
        
        // Volver a los datos originales
        formatMessagesHistory();
    };

    // Set active location
    const setActiveLocation = (index) => {
        activeLocationIndex.value = index;
        console.log('padre', index);
        selectedLocation.value = messagesHistory.value[index]
        console.log(selectedLocation.value)

    };

    const handleDateSearch = () => {
        // Obtener los valores de los inputs del date picker
        const startInput = document.getElementById('datepicker-range-start') as HTMLInputElement;
        const endInput = document.getElementById('datepicker-range-end') as HTMLInputElement;
        
        if (!startInput || !endInput) return;
        
        // Guardar los valores en las variables reactivas
        const startDateStr = startInput.value;
        const endDateStr = endInput.value;
        
        console.log('Fechas seleccionadas:', {
            inicio: startDateStr,
            fin: endDateStr
        });
        
        // Si ambos campos están vacíos, mostrar todos los datos
        if (!startDateStr && !endDateStr) {
            resetFilters();
            return;
        }

        // Si no tenemos el historial original, guardarlo
        if (originalLocations.value.length === 0) {
            console.log('Guardando historial original...');
            originalLocations.value = [...deviceInfo.value.locationHistory];
            console.log('Historial original guardado:', originalLocations.value.length, 'registros');
        }
        
        // Convertir fechas a objetos Date para comparación
        // Convertir formato MM/DD/YYYY a YYYY-MM-DD
        const formatDateForComparison = (dateStr: string) => {
            const [month, day, year] = dateStr.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        };

        const startDateTime = startDateStr ? new Date(`${formatDateForComparison(startDateStr)}T00:00:00`).getTime() : null;
        const endDateTime = endDateStr ? new Date(`${formatDateForComparison(endDateStr)}T23:59:59`).getTime() : null;
        
        console.log('Rango de fechas para filtrado:', {
            inicio: startDateTime ? new Date(startDateTime).toISOString() : 'No definido',
            fin: endDateTime ? new Date(endDateTime).toISOString() : 'No definido'
        });
        
        // Filtrar ubicaciones según el rango de fechas
        const filteredLocations = originalLocations.value.filter(location => {
            const locationDateTime = new Date(location.timestamp).getTime();
            const locationDate = new Date(location.timestamp);
            
            console.log('Comparando fecha:', {
                ubicacion: locationDate.toISOString(),
                timestamp: locationDateTime,
                cumpleFiltro: (
                    (!startDateTime || locationDateTime >= startDateTime) &&
                    (!endDateTime || locationDateTime <= endDateTime)
                )
            });
            
            return (
                (!startDateTime || locationDateTime >= startDateTime) &&
                (!endDateTime || locationDateTime <= endDateTime)
            );
        });
        
        // Ordenar las ubicaciones filtradas por fecha (más reciente primero)
        const sortedLocations = [...filteredLocations].sort((a, b) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        
        // Formatear las ubicaciones filtradas
        messagesHistory.value = sortedLocations.map((loc: any, index: number) => ({
            ...loc,
            label: loc.locationName,
            time: formatDate(loc.timestamp),
        }));
        
        // Activar el indicador de filtro
        isFiltered.value = true;
        
        // Resetear el índice de ubicación activa
        activeLocationIndex.value = 0;
    };

    onMounted(() => {
        console.log("Estado del dispositivo:", deviceStatus);
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