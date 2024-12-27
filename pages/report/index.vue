<template>
  <div>
    <Navbar/>
    <div class="grid gap-y-4 px-40">
      <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-10">Report</h1>
      <div class="w-full mt-5"> 
        <EasyDataTable
          :headers="headers"
          :items="locations"
          @expand-row="loadIntroduction"
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
    import type { Header, Item, SortType } from "vue3-easy-data-table";
    import type { SigfoxDevice } from '~/components/types/index';
    import StatusIconDevice from '~/components/StatusIconDevice.vue';
    import { formatDistanceToNow, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths } from 'date-fns';

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
        { text: 'Name', value: 'name' },
        { text: 'Device Type', value: 'deviceType' },
        { text: 'Last Seen', value: 'lastLocationUpdate' },
    ];

    const locations = ref<Location[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const deviceDetailsMap = ref<Record<string, any[]>>({});
    const loadingStates = ref<Record<string, boolean>>({});

    const sortBy = ref("associated_devices"); // Hacer reactivo
    const sortType = ref<SortType>("asc"); // Hacer reactivo
    // Función para obtener las ubicaciones
    const fetchReport = async () => {
        isLoading.value = true
        error.value = null        
        try {
            const response = await axios.get<Location[]>(`${apiBase}/locations/report/51742590-5703-4a34-a2ba-f8a7bc863981`)
            locations.value = response.data
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
        // expandedItem.introduction = expandedItem.devices;
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
              const status = diffHours <= 24 ? 'Connected' : 'Disconnected';

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

    onMounted(() => {
        fetchReport()
    })
  </script>