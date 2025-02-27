<template>
  <div>
    <Navbar/>
    <div class="grid gap-y-4 px-40">
      <div class="flex justify-between items-center">
        <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-6">Report</h1>        
      </div>
      <div class="flex justify-between items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Search Location..."
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
<<<<<<< HEAD
          @click="downloadExcel"
          class="px-4 py-2 bg-[#332d68] text-white rounded-md hover:bg-[#332d68] transition-colors flex items-center gap-2"
        >
          <i class="fas fa-download"></i> Download Report
=======
            @click="downloadExcel"
            class="px-4 py-2 bg-[#332d68] text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <i class="fas fa-download"></i> Download Report
>>>>>>> 7343857a4cf718b3ccde8b62c162b0d95021a412
        </button>
      </div>
      <div class="w-full mt-3"> 
        <EasyDataTable
          :headers="headers"
          :items="locations"
          :search-value="search"
          :sort-by="sortBy"           
          :sort-type="sortType"   
          @click-sort="handleSort"
          @expand-row="loadIntroduction"
          table-class-name="customize-table"
          :body-row-class-name="bodyRowClassNameFunction"
<<<<<<< HEAD
          :rows-per-page="30"
          :rows-items="[10, 20, 30, 40, 50]"
          :expand-rows="true"
=======
>>>>>>> 7343857a4cf718b3ccde8b62c162b0d95021a412
        >
          <template #expand="item">
            <div style="padding:25px 15px">       
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
import { ref, reactive } from "vue";
import axios from 'axios';
import * as XLSX from 'xlsx';
import type { Header, Item, SortType } from "vue3-easy-data-table";
import type { SigfoxDevice } from '~/components/types/index';
import StatusIconDevice from '~/components/StatusIconDevice.vue';
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths } from 'date-fns';

interface Location {
  id_location: string
  location: string
  mbs: string
  associated_devices: number
  city: string
  province: string
  address: string
  devices: string[]
  index: number
  radius: number
}

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const headers: Header[] = [
  { text: 'index', value: 'index', sortable: true },
  { text: 'Location', value: 'location' },
  { text: 'Micro base station ', value: 'mbs' },
  { text: 'Devices at the location ', value: 'associated_devices', sortable: true },
  { text: 'City ', value: 'city' },
  { text: 'Province ', value: 'province' },
  { text: 'Address ', value: 'address' },
];

const deviceHeaders: Header[] = [
  { text: 'Status', value: 'status' },
  { text: 'Device ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Device Type', value: 'deviceType' },
  { text: 'Last Seen', value: 'lastLocationUpdate' },
];

const search = ref("");
const locations = ref<Location[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const deviceDetailsMap = ref<Record<string, any[]>>({});
const loadingStates = ref<Record<string, boolean>>({});

const sortBy = ref("index");
const sortType = ref<SortType>("asc");

const fetchReport = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get<Location[]>(`${apiBase}/locations/report/51742590-5703-4a34-a2ba-f8a7bc863981`);
    locations.value = response.data;
    console.log('Locations loaded:', locations.value);
  } catch (e) {
    error.value = 'Error al cargar las ubicaciones';
    console.error('Error fetching locations:', e);
  } finally {
    isLoading.value = false;
  }
};

const formatDateLastSeen = (dateString: string | null): string => {
  if (!dateString) return 'No disponible';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const secondsDiff = differenceInSeconds(now, date);
    const minutesDiff = differenceInMinutes(now, date);
    const hoursDiff = differenceInHours(now, date);
    const daysDiff = differenceInDays(now, date);
    const monthsDiff = differenceInMonths(now, date);

    if (secondsDiff < 60) {
      return 'a few seconds ago';
    } else if (minutesDiff < 60) {
      return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hoursDiff < 24) {
      return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ago`;
    } else if (daysDiff < 30) {
      return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago`;
    } else {
      return `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} ago`;
    }
  } catch (error) {
    console.error('Error al formatear la fecha:', error);
    return 'Error en fecha';
  }
};

const loadIntroduction = async (expandedRows: any[], index: number) => {
  console.log('Loading introduction for index:', index);
  const item = locations.value[index];
  console.log('Item to expand:', item);

  if (!item || !item.devices) {
    console.error('Invalid item or missing id_location:', item);
    return;
  }

  if (!deviceDetailsMap.value[item.devices] && item.devices?.length) {
    loadingStates.value[item.devices] = true;
    
    try {
      const devicesPromises = item.devices.map((deviceId: string) => 
        axios.get<SigfoxDevice>(`${apiBase}/devices/${deviceId}`)
      );
      
      const responses = await Promise.all(devicesPromises);
      
      deviceDetailsMap.value[item.id_location] = responses.map((response: any) => {
        const lastUpdate = new Date(response.data.lastLocationUpdate);
        const now = new Date();
        const diffHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        
        const status = diffHours <= 48 ? 'Connected' : 'Disconnected';

        return {
          id: response.data.SigfoxId,
          name: response.data.name || '',
          deviceType: response.data.deviceType || '',
          lastLocationUpdate: formatDateLastSeen(response.data.lastLocationUpdate),
          status: status
        };
      });

      console.log('Loaded devices for location:', item.id_location, deviceDetailsMap.value[item.id_location]);
    } catch (e) {
      error.value = 'Error al cargar los detalles de los dispositivos';
      console.error('Error fetching device details:', e);
    } finally {
      loadingStates.value[item.id_location] = false;
    }
  }
};

const handleSort = (headerId: string) => {
  if (sortBy.value === headerId) {
    sortType.value = sortType.value === 'desc' ? 'asc' : 'desc';
  } else {
    sortBy.value = headerId;
    sortType.value = 'asc';
  }
};

const bodyRowClassNameFunction = (item: any, rowNumber: number): string => {
  return item.index === 0 ? 'first-row' : '';
};

const formatLocationForExcel = (location: any) => {
  return {
    'Location': location.location,
    'Micro base station': location.mbs,
    'Devices at location': location.associated_devices,
    'City': location.city,
    'Province': location.province,
    'Address': location.address,
  };
};

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

const downloadExcel = async () => {
  try {
    const wb = XLSX.utils.book_new();
    
    const locationSheet = XLSX.utils.json_to_sheet(
      locations.value.map(formatLocationForExcel)
    );
    XLSX.utils.book_append_sheet(wb, locationSheet, 'Locations');

    const allDevices: any[] = [];
    
    for (const location of locations.value) {
      if (location.devices?.length) {
        if (!deviceDetailsMap.value[location.id_location]) {
          await loadIntroduction([location.id_location], locations.value.indexOf(location));
        }
        
        const locationDevices = deviceDetailsMap.value[location.id_location] || [];
        locationDevices.forEach(device => {
          allDevices.push(formatDeviceForExcel(device, location.location));
        });
      }
    }

    if (allDevices.length) {
      const devicesSheet = XLSX.utils.json_to_sheet(allDevices);
      XLSX.utils.book_append_sheet(wb, devicesSheet, 'Devices');
    }

    XLSX.writeFile(wb, 'report.xlsx');
  } catch (error) {
    console.error('Error generating Excel file:', error);
  }
};

onMounted(() => {
  fetchReport();
});
</script>

<style>
.customize-table {
  --easy-table-body-row-hover-background-color: #332d68;
  --easy-table-body-row-hover-font-color: #fff;
}
.first-row {
  --easy-table-body-row-background-color: #332d68;
  --easy-table-body-row-font-color: #fff;
}
</style>