<template>
  <client-only>
    <GoogleMap
      :api-key="apiKey"
      :center="mapCenter"
      :zoom="initialZoom"
      style="width: 100%; height: 100%;"
      @load="onLoad"
    >
      <!-- Renderizamos los marcadores y círculos de las ubicaciones -->
      <template v-for="location in locations" :key="location.id">
        <Circle 
          :options="getCircleOptions(location)"
        />
        <Marker 
          :options="getLocationMarkerOptions(location)"
          @click="handleLocationClick(location)"
        />
      </template>

      <!-- Renderizamos los marcadores de los dispositivos -->
      <template v-for="device in devices" :key="device.deviceId">
        <Marker 
          :options="getDeviceMarkerOptions(device)"
          @click="handleDeviceClick(device)"
        />
      </template>
    </GoogleMap>
  </client-only>
</template>

<script setup>
import { useRuntimeConfig } from '#app'
import { GoogleMap, Circle, Marker } from 'vue3-google-map'
import { ref, computed } from 'vue'

const props = defineProps({
  // Mantenemos las ubicaciones originales
  locations: {
    type: Array,
    required: true,
    default: () => []
  },
  // Añadimos los dispositivos como nueva prop
  devices: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['location-click', 'device-click'])

const config = useRuntimeConfig()
const apiKey = config.public.apiGoogleMaps

// Calculamos el centro del mapa basado en todos los puntos disponibles
const mapCenter = computed(() => {
  // Primero intentamos con las ubicaciones
  if (props.locations && props.locations.length > 0) {
    return {
      lat: Number(props.locations[0].latitude),
      lng: Number(props.locations[0].longitude)
    }
  }
  // Si no hay ubicaciones, intentamos con los dispositivos
  if (props.devices && props.devices.length > 0) {
    return {
      lat: Number(props.devices[0].lastLatitude),
      lng: Number(props.devices[0].lastLongitude)
    }
  }
  return { lat: 0, lng: 0 } // Valor por defecto si no hay puntos
})

const initialZoom = ref(10)
const map = ref(null)

// Función para los marcadores de ubicaciones
const getLocationMarkerOptions = (location) => ({
  position: {
    lat: Number(location.latitude),
    lng: Number(location.longitude)
  },
  icon: 'https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png',
  title: location.name,
  label: {
    text: location.name,
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 'bold',
    className: 'map-label'
  }
})

// Nueva función para los marcadores de dispositivos
const getDeviceMarkerOptions = (device) => ({
  position: {
    lat: Number(device.lastLatitude),
    lng: Number(device.lastLongitude)
  },
  icon: 'https://maps.gstatic.com/mapfiles/ms/icons/red-dot.png', // Usamos un color diferente
  title: device.SigfoxId,
  label: {
    text: device.SigfoxId,
    color: '#5700E6',
    fontSize: '14px',
    fontWeight: 'bold',
    className: 'device-label'
  }
})

// Función para los círculos de ubicaciones
const getCircleOptions = (location) => ({
  center: {
    lat: Number(location.latitude),
    lng: Number(location.longitude)
  },
  radius: Number(location.radiusMeters),
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
})

// Manejadores de click separados para ubicaciones y dispositivos
const handleLocationClick = (location) => {
  emit('location-click', location)
}

const handleDeviceClick = (device) => {
  emit('device-click', device)
}

const onLoad = (mapInstance) => {
  map.value = mapInstance
  
  // Creamos bounds que incluyan todos los puntos
  if ((props.locations && props.locations.length > 0) || (props.devices && props.devices.length > 0)) {
    const bounds = new google.maps.LatLngBounds()
    
    // Añadimos las ubicaciones
    props.locations.forEach(location => {
      bounds.extend({
        lat: Number(location.latitude),
        lng: Number(location.longitude)
      })
    })

    // Añadimos los dispositivos
    props.devices.forEach(device => {
      bounds.extend({
        lat: Number(device.lastLatitude),
        lng: Number(device.lastLongitude)
      })
    })
    
    map.value.fitBounds(bounds)
  }
}
</script>

<style>
/* Estilos para las etiquetas de ubicaciones */
:deep(.map-label) {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  border: 1px solid #FFFFFF;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}

/* Estilos para las etiquetas de dispositivos */
:deep(.device-label) {
  background-color: rgba(220, 0, 0, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  border: 1px solid #FFFFFF;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}
</style>