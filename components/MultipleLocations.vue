<template>
    <client-only>
      <GoogleMap
        :api-key="apiKey"
        :center="mapCenter"
        :zoom="initialZoom"
        style="width: 100%; height: 100%;"
        @load="onLoad"
      >
        <template v-for="location in locations" :key="location.id">
          <Circle 
            :options="getCircleOptions(location)"
          />
          <Marker 
            :options="getMarkerOptions(location)"
            @click="handleMarkerClick(location)"
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
    locations: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  
  const emit = defineEmits(['marker-click'])
  
  const config = useRuntimeConfig()
  const apiKey = config.public.apiGoogleMaps
  
  // Calculamos el centro del mapa basado en la primera ubicación o un valor por defecto
  const mapCenter = computed(() => {
    if (props.locations && props.locations.length > 0) {
      return {
        lat: Number(props.locations[0].latitude),
        lng: Number(props.locations[0].longitude)
      }
    }
    return { lat: 0, lng: 0 } // Valor por defecto si no hay ubicaciones
  })
  
  const initialZoom = ref(10)
  const map = ref(null)
  
  // Función para obtener las opciones del marcador para cada ubicación
  const getMarkerOptions = (location) => ({
    position: {
      lat: Number(location.latitude),
      lng: Number(location.longitude)
    },
    icon: 'https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png',
    title: location.name,
    // Añadimos la etiqueta con el nombre de la ubicación
    label: {
      text: location.name,
      color: '#071c5f', // Color del texto
      fontSize: '16px',  // Tamaño del texto
      fontWeight: 'bold' // Peso de la fuente
    }
  })
  
  // Función para obtener las opciones del círculo para cada ubicación
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
  
  // Manejador de click en el marcador
  const handleMarkerClick = (location) => {
    emit('marker-click', location)
  }
  
  const onLoad = (mapInstance) => {
    map.value = mapInstance
    
    // Si hay ubicaciones, ajustamos el mapa para mostrarlas todas
    if (props.locations && props.locations.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      
      props.locations.forEach(location => {
        bounds.extend({
          lat: Number(location.latitude),
          lng: Number(location.longitude)
        })
      })
      
      map.value.fitBounds(bounds)
    }
  }
  </script>