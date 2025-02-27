<template>
  <EasyDataTable
    :headers="headers"
    :items="locations"
    @expand-row="handleExpandRow"
  >
    <template #expand="{ item }">
      <div v-if="deviceDetailsMap.get(item.id_location)?.length" style="padding: 15px">
        <ul>
          <li v-for="device in deviceDetailsMap.get(item.id_location)" :key="device.id"
              class="flex items-center justify-between p-2 border-b">
            <div>
              <span class="font-bold">{{ device.name }}</span> - 
              <span>{{ device.deviceType }}</span>
            </div>
            <div>
              <span :class="device.status === 'Connected' ? 'text-green-500' : 'text-red-500'">
                {{ device.status }}
              </span>
              <span class="ml-4 text-gray-500">{{ device.lastLocationUpdate }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="loadingDevices[item.id_location]" style="padding: 15px">
        Cargando dispositivos...
      </div>
      <div v-else style="padding: 15px; color: red;">
        No hay dispositivos disponibles.
      </div>
    </template>
  </EasyDataTable>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import type { Header } from "vue3-easy-data-table";

// Configuración y estado
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const isLoading = ref(false);
const error = ref<string | null>(null);
const locations = ref<any[]>([]);
// const expandedDevices = ref<Record<number, any[]>>({});
  const expandedDevices = ref(new Map());


// Headers de la tabla
const headers: Header[] = [
  { text: 'Index', value: 'index', sortable: true },
  { text: 'Location', value: 'location' },
  { text: 'Micro base station', value: 'mbs' },
  { text: 'Devices at the location', value: 'associated_devices', sortable: true },
  { text: 'City', value: 'city' },
  { text: 'Province', value: 'province' },
  { text: 'Address', value: 'address' },
];

// Función para cargar los datos de las ubicaciones
const fetchReport = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get<any[]>(`${apiBase}/locations/report/51742590-5703-4a34-a2ba-f8a7bc863981`);
    locations.value = response.data.map((location, index) => ({
      ...location,
    }));
    console.log("Datos cargados:", locations.value);
  } catch (e) {
    error.value = 'Error al cargar las ubicaciones';
    console.error('Error fetching locations:', e);
  } finally {
    isLoading.value = false;
  }
};

// Función para cargar los dispositivos de una ubicación
const fetchDeviceByLocation = async (deviceIds: string[]): Promise<any[]> => {
  isLoading.value = true;
  error.value = null;
  try {
    const devicesPromises = deviceIds.map((deviceId) =>
      axios.get<any>(`${apiBase}/devices/${deviceId}`)
    );
    const devicesResponses = await Promise.all(devicesPromises);
    const devicesData = devicesResponses.map((response) => response.data);
    return devicesData;
  } catch (e) {
    error.value = 'Error al cargar los dispositivos';
    console.error('Error fetching devices:', e);
    throw e;
  } finally {
    isLoading.value = false;
  }
};

const deviceDetailsMap = ref(new Map());
const loadingDevices = ref<Record<string, boolean>>({});

const handleExpandRow = async (rowIndex: number) => {
  const item = locations.value[rowIndex];
  console.log("Expandiendo fila:", item);
  
  if (!item || !item.devices || item.devices.length === 0) {
    deviceDetailsMap.value.set(item.id_location, []);
    deviceDetailsMap.value = new Map(deviceDetailsMap.value);
    return;
  }

  // Si ya tenemos los datos, no los volvemos a cargar
  if (deviceDetailsMap.value.get(item.id_location)) {
    return;
  }

  loadingDevices.value[item.id_location] = true;

  try {
    const devicesPromises = item.devices.map((deviceId: string) =>
      axios.get<any>(`${apiBase}/devices/${deviceId}`)
    );
    
    const responses = await Promise.all(devicesPromises);
    const devicesData = responses.map(response => {
      const lastUpdate = new Date(response.data.lastLocationUpdate);
      const now = new Date();
      const diffHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
      
      return {
        id: response.data.SigfoxId,
        name: response.data.name || '',
        deviceType: response.data.deviceType || '',
        // lastLocationUpdate: formatDateLastSeen(response.data.lastLocationUpdate),
        status: diffHours <= 48 ? 'Connected' : 'Disconnected'
      };
    });

    deviceDetailsMap.value.set(item.id_location, devicesData);
    deviceDetailsMap.value = new Map(deviceDetailsMap.value); // Forzar reactividad
    console.log('devices loaded:', devicesData);
  } catch (e) {
    console.error("Error al cargar los dispositivos:", e);
    deviceDetailsMap.value.set(item.id_location, []);
    deviceDetailsMap.value = new Map(deviceDetailsMap.value);
  } finally {
    loadingDevices.value[item.id_location] = false;
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchReport();
});
</script>