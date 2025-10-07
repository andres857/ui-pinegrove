<template>
  <div>
    <Navbar/>
    <div class="grid gap-y-4 px-40">
      <div class="flex justify-between items-center ">
        <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-6 ">Report</h1>
        
      </div>
      <div class="flex justify-between items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Search Location..."
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
            @click="downloadExcel"
            class="px-4 py-2 bg-[#332d68] text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-download"></i> Download Report
        </button>
      </div>
      <div class="w-full mt-3"> 
        <EasyDataTable
          :headers="headers"
          :items="locations"
          :search-value="search"
          @expand-row="loadIntroduction"
          table-class-name="customize-table"
          :body-row-class-name="bodyRowClassNameFunction"
        >
          <template #expand="item">
            <div
              v-if="item.introduction"
              style="padding:25px 15px"
            >       
              <EasyDataTable
                :headers="deviceHeaders"
                :items="deviceDetailsMap[item.id_location] || []"
                :loading="loadingStates[item.id_location]"
                :sort-by="sortBy"
                :sort-type="sortType"
                show-index
              >
                <template #item-status="{ status }">
                  <StatusIconDevice :status="status" style="margin-left: 8px;" />
                </template>
              </EasyDataTable>
            </div>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
    import { useRuntimeConfig } from '#app';
    import { ref } from "vue";
    import axios from 'axios';
    import * as XLSX from 'xlsx';
    import type { Header, Item, SortType } from "vue3-easy-data-table";
    import type { SigfoxDevice } from '~/components/types/index';
    import StatusIconDevice from '~/components/StatusIconDevice.vue';
    import {  differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths } from 'date-fns';

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

    const headers: Header[] = [
      { text: 'index', value: 'index' },
      { text: 'Location', value: 'location' },
      { text: 'Micro base station ', value: 'mbs' },
      { text: 'Devices at the location ', value: 'associated_devices',sortable: true },
      { text: 'City ', value: 'city' },
      { text: 'Province ', value: 'province' },
      { text: 'Address ', value: 'address' },
      { text: 'Radius ', value: 'radius' },
    ];

    // Headers para la tabla de devices
    const deviceHeaders: Header[] = [
        { text: 'Status', value: 'status' },
        { text: 'Device ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Device Type', value: 'deviceType' },
        { text: 'Last Seen', value: 'lastLocationUpdate' },
    ];

    const search = ref("");
    const searchField = ref(["location", "city", "province", "address"]);

    const locations = ref<Location[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const deviceDetailsMap = ref<Record<string, any[]>>({});
    const loadingStates = ref<Record<string, boolean>>({});

    const sortBy = ref("associated_devices"); 
    const sortType = ref<SortType>("asc"); 

    // obtener las ubicaciones
    const fetchReport = async () => {
        isLoading.value = true
        error.value = null        
        try {
            const response = await axios.get<Location[]>(`${apiBase}/locations/report/e8a53dfb-bd89-4419-9602-414bea118aae`)
            // locations.value = response.data
            locations.value = response.data.sort((a, b) => {
                // Asumiendo que el índice es un número
                return (a.index || 0) - (b.index || 0)
            })
            console.log(response.data);
        } catch (e) {
            error.value = 'Error al cargar las ubicaciones'
            console.error('Error fetching locations:', e)
        } finally {
            isLoading.value = false
        }
    }

    const formatDateLastSeen = (dateString: string | null): string => {
      if (!dateString) return 'No disponible';
      
      try {
          const date = new Date(dateString);
          const now = new Date();
          
          if (isNaN(date.getTime())) {
              return 'Fecha inválida';
          }

          // Calculamos las diferentes unidades de tiempo
          const secondsDiff = differenceInSeconds(now, date);
          const minutesDiff = differenceInMinutes(now, date);
          const hoursDiff = differenceInHours(now, date);
          const daysDiff = differenceInDays(now, date);
          const monthsDiff = differenceInMonths(now, date);

          // Personalizamos el mensaje según el intervalo de tiempo
          if (secondsDiff < 60) {
              return 'a few seconds ago';
          } else if (minutesDiff < 60) {
              return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} minutes ago`;
          } else if (hoursDiff < 24) {
              return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} hours ago`;
          } else if (daysDiff < 30) {
              return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} days ago`;
          } else {
              return `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} months ago`;
          }
      } catch (error) {
          console.error('Error al formatear la fecha:', error);
          return 'Error en fecha';
      }
    };

    const loadIntroduction = async (index: number): Promise<void> => {
      const expandedItem = locations.value[index];
      if (!expandedItem.introduction) {
        expandedItem.expandLoading = true;
        expandedItem.introduction = expandedItem.associated_devices;
        
        if (!deviceDetailsMap.value[expandedItem.id_location]) {
          loadingStates.value[expandedItem.id_location] = true;
          
          try {
            const devicesPromises = expandedItem.devices.map((deviceId:any) => 
              axios.get<SigfoxDevice>(`${apiBase}/devices/${deviceId}`)
            );
            
            const responses = await Promise.all(devicesPromises);
            
            deviceDetailsMap.value[expandedItem.id_location] = responses.map((response:any) => {
              // Calcular la diferencia en horas
              const lastUpdate = new Date(response.data.lastLocationUpdate);
              const now = new Date();
              const diffHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
              
              // Determinar el estado basado en la diferencia de tiempo
              const status = diffHours <= 48 ? 'Connected' : 'Disconnected';

              return {
                id: response.data.SigfoxId,
                name: response.data.name || '',
                deviceType: response.data.deviceType || '',
                lastLocationUpdate: formatDateLastSeen(response.data.lastLocationUpdate),
                status:status
              };
            });

          } catch (e) {
            error.value = 'Error al cargar los detalles de los dispositivos';
            console.error('Error fetching device details:', e);
          } finally {
            loadingStates.value[expandedItem.id_location] = false;
          }
        }
        
        expandedItem.expandLoading = false;
      }
    };

    const bodyRowClassNameFunction = (item: any): string => {
      return item.index === 0 ? 'first-row' : '';
    };

    // Function to format location data for Excel
    const formatLocationForExcel = (location: any) => {
      return {
        'Location': location.location,
        'Micro base station': location.mbs,
        'Devices at location': location.associated_devices,
        'City': location.city,
        'Province': location.province,
        'Address': location.address,
        'Radius (meters)': location.radius
      };
    };

    // Function to format device data for Excel
    const formatDeviceForExcel = (device: any, locationName: string) => {
      return {
        'Location': locationName,
        'Device ID': device.id,
        'Device Name': device.name,
        'Device Type': device.deviceType,
        'Status': device.status,
        'Last Seen': device.lastLocationUpdate
      };
    };

    // Main download function
    const downloadExcel = async () => {
      try {
        // Create workbook and worksheets
        const wb = XLSX.utils.book_new();
        
        // Format locations data for first sheet
        const locationSheet = XLSX.utils.json_to_sheet(
          locations.value.map(formatLocationForExcel)
        );
        XLSX.utils.book_append_sheet(wb, locationSheet, 'Locations');

        // Create devices sheet with detailed information
        const allDevices: any[] = [];
        
        // Gather all devices with their location information
        for (const location of locations.value) {
          if (location.devices?.length) {
            // If devices haven't been loaded yet, load them
            if (!deviceDetailsMap.value[location.id_location]) {
              await loadIntroduction(locations.value.indexOf(location));
            }
            
            const locationDevices = deviceDetailsMap.value[location.id_location] || [];
            locationDevices.forEach(device => {
              allDevices.push(formatDeviceForExcel(device, location.location));
            });
          }
        }

        // Add devices sheet if there are devices
        if (allDevices.length) {
          const devicesSheet = XLSX.utils.json_to_sheet(allDevices);
          XLSX.utils.book_append_sheet(wb, devicesSheet, 'Devices');
        }

        // Generate and download the file
        XLSX.writeFile(wb, 'report.xlsx');
      } catch (error) {
        console.error('Error generating Excel file:', error);
        // You might want to add some user feedback here
      }
    };

    onMounted(() => {
        // fetchReport()
        fetchReport() 
    })
  </script>

<style>
/* Esta clase personaliza los colores de la tabla */
.customize-table {
  --easy-table-border: 1px solid #ddd;
  --easy-table-row-border: 1px solid #ddd;
  
  /* Color cuando se hace hover sobre una fila */
  --easy-table-body-row-hover-background-color: #332d68;
  --easy-table-body-row-hover-font-color: #fff;
}

/* Esta clase define el estilo para la primera fila */
.first-row {
  --easy-table-body-row-background-color: #332d68;
  --easy-table-body-row-font-color: #fff;
}

/* Podemos añadir más estilos personalizados para mejorar la apariencia */
.customize-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.customize-table td {
  padding: 12px 8px;
}
</style>