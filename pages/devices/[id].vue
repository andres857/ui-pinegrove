<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Diseño con sidebar -->
    <div class="flex min-h-screen">
      <!-- Sidebar Navegación -->
      <aside class="w-64 bg-gray-800 border-r border-gray-700">
        <div class="p-6 border-b border-gray-700">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span class="text-gray-900 font-bold">T</span>
            </div>
            <span class="text-xl font-bold text-yellow-500">Technogym</span>
          </div>
        </div>
        
        <nav class="p-4 space-y-1">
          <NuxtLink to="/" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <span class="text-sm font-medium">Home</span>
          </NuxtLink>
          
          <NuxtLink to="/locations" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span class="text-sm font-medium">Locations</span>
          </NuxtLink>

          <NuxtLink to="/devices" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-yellow-500 text-gray-900 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span class="text-sm font-medium">Devices</span>
          </NuxtLink>

          <NuxtLink to="/report" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span class="text-sm font-medium">Report</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Contenido Principal -->
      <main class="flex-1 overflow-x-hidden">
        <!-- Header -->
        <header class="bg-gray-800 border-b border-gray-700">
          <div class="px-8 py-4 flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-white">Device Details</h1>
            <div class="flex items-center space-x-4">
              <button class="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </button>
              <div class="flex items-center space-x-3">
                <div class="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span class="text-gray-900 text-sm font-semibold">FA</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-white">Admin</p>
                  <p class="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Contenido -->
        <div class="p-8">
          <!-- Device Information Card -->
          <div class="mb-6 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div class="px-6 py-4">
              <div v-if="deviceInfo" class="flex items-center gap-6 flex-wrap">
                <div class="flex items-center gap-2">
                  <svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" :fill="deviceStatusColor" />
                  </svg>
                  <span class="text-sm text-gray-400">Status</span>
                </div>
                
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-400">Device ID:</span>
                  <span class="text-sm text-white font-medium">{{ deviceInfo?.SigfoxId || 'N/A' }}</span>
                </div>
                
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-400">Type:</span>
                  <span class="text-sm text-white font-medium">{{ deviceInfo.aliasDeviceType || 'N/A' }}</span>
                </div>
                
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-400">Container:</span>
                  <span class="text-sm text-white font-medium">{{ deviceInfo.friendlyName || 'N/A' }}</span>
                </div>
                
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-400">Last Update:</span>
                  <span class="text-sm text-white font-medium">{{ formatDate(deviceInfo.lastLocationUpdate) }}</span>
                </div>
                
                <!-- Edit Button with Modal -->
                <div class="ml-auto">
                  <ModalToggle ref="deviceModal" title="Edit Device Information">
                    <template #trigger>
                      <button class="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
                      </button>
                    </template>
                    
                    <!-- Modal Content -->
                    <form @submit.prevent="updateDevice">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-300 mb-2">Container Name</label>
                          <input 
                            v-model="editedDevice.friendlyName" 
                            type="text" 
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 text-white"
                          />
                        </div>
                        
                        <div>
                          <label class="block text-sm font-medium text-gray-300 mb-2">Device Type</label>
                          <input 
                            v-model="editedDevice.aliasDeviceType" 
                            type="text" 
                            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 text-white"
                          />
                        </div>
                      </div>
                      
                      <div class="mt-6 flex justify-end space-x-3">
                        <button 
                          type="button" 
                          @click="$refs.deviceModal.closeModal()" 
                          class="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          class="px-4 py-2 bg-yellow-500 rounded-lg text-sm font-medium text-gray-900 hover:bg-yellow-400 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </ModalToggle>
                </div>
              </div>
              <div v-else>
                <p class="text-gray-400">Loading...</p>
              </div>
            </div>
          </div>

          <!-- Date Range Filters -->
          <div class="mb-6 flex justify-end items-center gap-3 flex-wrap">
            <div class="flex items-center gap-3 flex-wrap">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
                <input 
                  id="datepicker-range-start" 
                  name="start" 
                  type="text" 
                  class="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5 placeholder-gray-400"
                  placeholder="Select date start"
                />
              </div>
              
              <span class="text-gray-400">to</span>
              
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
                <input 
                  id="datepicker-range-end" 
                  name="end" 
                  type="text" 
                  class="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5 placeholder-gray-400"
                  placeholder="Select date end"
                />
              </div>
            </div>
            
            <button
              @click="handleDateSearch"
              type="button"
              class="px-4 py-2.5 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors font-medium text-sm"
            >
              Search
            </button>
            
            <button
              v-if="isFiltered"
              @click="resetFilters"
              type="button"
              class="px-4 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-medium text-sm"
            >
              Clear Filters
            </button>
          </div>

          <!-- Map and Timeline Container -->
          <div class="grid grid-cols-12 gap-6" style="height: calc(100vh - 420px); min-height: 500px;">
            <!-- Timeline -->
            <div class="col-span-3 bg-gray-800 rounded-lg border border-gray-700 p-5 flex flex-col h-full overflow-hidden">
              <div class="flex justify-between items-center mb-4 flex-shrink-0">
                <h4 class="font-semibold text-white text-sm">Device Positions</h4>
                <span v-if="isFiltered" class="text-xs text-yellow-500 font-medium">
                  ({{ messagesHistory.length }} filtered)
                </span>
              </div>
              
              <!-- Lista de posiciones con scroll -->
              <div class="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2 min-h-0">
                <div 
                  v-for="(location, index) in messagesHistory"
                  :key="index" 
                  class="cursor-pointer transition-all duration-200 p-3 rounded-lg hover:bg-gray-700"
                  @click="setActiveLocation(index)"
                  :class="{
                    'bg-yellow-500/10 border border-yellow-500/30': index === 0
                  }"
                >
                  <div class="flex gap-3">
                    <div class="flex items-start pt-1 flex-shrink-0">
                      <svg v-if="index === 0" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <svg v-else class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    <div class="flex-1 min-w-0">
                      <span
                        v-if="index === 0"
                        class="inline-block text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full font-medium mb-1"
                      >
                        Latest Position
                      </span>

                      <h3 
                        class="text-sm font-semibold truncate"
                        :class="{ 'text-yellow-500': activeLocationIndex === index || index === 0, 'text-white': activeLocationIndex !== index && index !== 0 }"
                      >
                        {{ location.label }}
                      </h3>

                      <time class="block text-xs text-gray-400 mt-1">
                        {{ location.time }}
                      </time>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Selected Location Card - Fijo al final -->
              <div v-if="selectedLocation" class="mt-4 pt-4 border-t border-gray-700 flex-shrink-0">
                <h4 class="text-sm font-semibold text-white mb-3">Selected Location</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between gap-2">
                    <span class="text-gray-400 flex-shrink-0">Location:</span>
                    <span class="text-white font-medium text-right break-words">{{ selectedLocation.locationName }}</span>
                  </div>
                  <div class="flex justify-between gap-2">
                    <span class="text-gray-400 flex-shrink-0">Date:</span>
                    <span class="text-white font-medium text-xs text-right">{{ selectedLocation.time }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="col-span-9 h-full">
              <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden h-full">
                <Map v-if="messagesHistory.length > 0"
                  :locations="locationHistory"
                  :active-index="activeLocationIndex"
                  :show-radius-circles="false"
                  @marker-click="setActiveLocation"
                  class="h-full w-full"
                />
                <div v-else class="flex items-center justify-center h-full text-gray-400">
                  No location information available
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { useRuntimeConfig } from '#app'
    import axios from 'axios'
    import { ref, onMounted, computed, reactive, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import Map from '~/components/MapMultipleLocations.vue'
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
    const deviceStatus = route.query.deviceStatus as string;

    const deviceStatusColor = computed(() => {
        return deviceStatus === 'Connected' ? '#008000' : '#FF0000';
    });

    const deviceInfo = ref<DeviceLocation[] | null>(null)
    const isLoading = ref(false)
    const messagesHistory = ref([])
    const activeLocationIndex = ref(0)

    const startDate = ref(null);
    const endDate = ref(null);
    const originalLocations = ref([])
    const isFiltered = ref(false)

    const selectedLocation = ref(null)

    const deviceModal = ref(null);
    const editedDevice = reactive({
        deviceId: '',
        friendlyName: '',
        aliasDeviceType: '',
        SigfoxId: ''
    });

    const prepareEditDevice = () => {
        if (deviceInfo.value && deviceInfo.value[0]?.device) {
            editedDevice.deviceId = deviceInfo.value[0].device.SigfoxId;
            editedDevice.friendlyName = deviceInfo.value[0].device.friendlyName || '';
            editedDevice.aliasDeviceType = deviceInfo.value[0].device.aliasDeviceType || '';
            editedDevice.SigfoxId = deviceInfo.value[0].device.SigfoxId;
        }
    };

    watch(() => deviceModal.value?.isOpen, (isOpen) => {
        if (isOpen) {
            prepareEditDevice();
        }
    });

    const updateDevice = async () => {
        try {
            if (deviceInfo.value && deviceInfo.value[0]?.device) {
                deviceInfo.value[0].device.friendlyName = editedDevice.friendlyName;
                deviceInfo.value[0].device.aliasDeviceType = editedDevice.aliasDeviceType;
            }
            
            const response = await axios.put(`${apiBase}/devices/${editedDevice.deviceId}`, {
                friendlyName: editedDevice.friendlyName,
                aliasDeviceType: editedDevice.aliasDeviceType
            });
            
            if (response.status === 200 || response.status === 204) {
                deviceModal.value?.closeModal();
                console.log('Dispositivo actualizado correctamente');
            } else {
                console.error('Error al actualizar dispositivo:', response);
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    const locationHistory = computed(() => {
        if (!deviceInfo.value || deviceInfo.value.length === 0) {
            return [];
        }
        return messagesHistory.value.map((loc: any, index: number) => {
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
        return new Date(dateString).toLocaleString('en-US', {
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
        
        const last10Locations = [...deviceInfo.value.locationHistory]
            .slice(-10)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        messagesHistory.value = last10Locations.map((loc: any, index: number) => {
            return {
                ...loc,
                label:  loc.locationName,
                time: formatDate(loc.timestamp),
            };
        });
    }

    const resetFilters = () => {
        const startInput = document.getElementById('datepicker-range-start') as HTMLInputElement;
        const endInput = document.getElementById('datepicker-range-end') as HTMLInputElement;
        if (startInput && endInput) {
            startInput.value = '';
            endInput.value = '';
        }
        
        startDate.value = null;
        endDate.value = null;
        isFiltered.value = false;
        
        formatMessagesHistory();
    };

    const setActiveLocation = (index) => {
        activeLocationIndex.value = index;
        console.log('padre', index);
        selectedLocation.value = messagesHistory.value[index]
        console.log(selectedLocation.value)
    };

    const handleDateSearch = () => {
        const startInput = document.getElementById('datepicker-range-start') as HTMLInputElement;
        const endInput = document.getElementById('datepicker-range-end') as HTMLInputElement;
        
        if (!startInput || !endInput) return;
        
        const startDateStr = startInput.value;
        const endDateStr = endInput.value;
        
        console.log('Fechas seleccionadas:', {
            inicio: startDateStr,
            fin: endDateStr
        });
        
        if (!startDateStr && !endDateStr) {
            resetFilters();
            return;
        }

        if (originalLocations.value.length === 0) {
            console.log('Guardando historial original...');
            originalLocations.value = [...deviceInfo.value.locationHistory];
            console.log('Historial original guardado:', originalLocations.value.length, 'registros');
        }
        
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
        
        const sortedLocations = [...filteredLocations].sort((a, b) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        
        messagesHistory.value = sortedLocations.map((loc: any, index: number) => ({
            ...loc,
            label: loc.locationName,
            time: formatDate(loc.timestamp),
        }));
        
        isFiltered.value = true;
        activeLocationIndex.value = 0;
    };

    onMounted(() => {
        console.log("Estado del dispositivo:", deviceStatus);
        loadDeviceDetails();
    });
</script>

<style scoped>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #6b7280 #374151;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>