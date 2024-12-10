<template>
    <client-only>
      <GoogleMap
        :api-key="apiKey"
        :center="center"
        :zoom="12"
        style="width: 100%; height: 500px"
        @load="onLoad"
      >
        <Circle :options="circleOptions" />
        
        <Marker :options="{ 
          position: { 
            lat: center.lat, 
            lng: center.lng 
          }, 
          icon: markerIconLocations 
        }"/>
        
      </GoogleMap>
    </client-only>
  </template>
  
<script lang="ts" setup>
  import { useRuntimeConfig } from '#app'
  import { GoogleMap, Circle, Marker } from 'vue3-google-map'
  import { ref, onMounted } from 'vue'

  const config = useRuntimeConfig()
  const apiKey = config.public.apiGoogleMaps
  
  // Coordenadas del centro de Bogotá
  const center = ref({
    lat: 4.6097,
    lng: -74.0817
  })

  // Variable para almacenar la referencia al mapa
  const map = ref(null)
  const markers = ref([])

  const markerIconLocations = 'https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png'


  // Función que se ejecuta cuando el mapa se carga
  const onLoad = async (mapInstance) => {
    
    map.value = mapInstance
    
    // Cargamos la biblioteca de marcadores avanzados
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
    
    // // Creamos el marcador avanzado
    // const marker = new AdvancedMarkerElement({
    //   map: mapInstance,
    //   position: center.value,
    //   title: 'Bogotá',
    //   // Para personalizar el marcador, puedes usar el elemento content
    // })
  }

  // Configuración del círculo
  const circleOptions = {
    center: center.value,
    radius: 2000,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  }

</script>