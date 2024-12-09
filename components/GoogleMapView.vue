<template>
    <client-only>
      <!-- Envolvemos el mapa en client-only ya que necesita acceso al objeto window -->
      <GoogleMap
        :api-key="apiKey"
        :center="center"
        :zoom="12"
        style="width: 100%; height: 500px"
      >
        <!-- Agregamos un marcador en el centro de Bogotá -->
        <Marker :options="markerOptions" />
        
        <!-- Agregamos un círculo para mostrar el área -->
        <Circle :options="circleOptions" />
      </GoogleMap>
    </client-only>
  </template>
  
  <script setup>
  import { GoogleMap, Marker, Circle } from 'vue3-google-map'
  import { ref } from 'vue'
  
  // Coordenadas del centro de Bogotá
  const center = ref({
    lat: 4.6097,  // Latitud de Bogotá
    lng: -74.0817 // Longitud de Bogotá
  })
  
  // Tu API key de Google Maps (recuerda mantenerla segura en variables de entorno)
  const apiKey = 'AIzaSyAOUZ9OeINieyhHHLJL0nRIOfizXyyxr8E'
  
  // Configuración del marcador
  const markerOptions = {
    position: center.value,
    title: 'Bogotá',
    // Puedes personalizar el ícono si lo deseas
    // icon: {
    //   url: '/ruta-a-tu-icono.png',
    //   scaledSize: { width: 32, height: 32 }
    // }
  }
  
  // Configuración del círculo que rodea el marcador
  const circleOptions = {
    center: center.value,
    radius: 2000, // Radio en metros (2 km)
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  }
  </script>