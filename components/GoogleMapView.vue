<template>
  <client-only>
    <GoogleMap
      :api-key="apiKey"
      :center="coordinates"
      :zoom="12"
      style="width: 100%; height: 500px"
      @load="onLoad"
    >
      <Circle :options="circleOptions" />
      <Marker :options="markerOptions"/>
    </GoogleMap>
  </client-only>
</template>
  
<script setup>
import { useRuntimeConfig } from '#app'
import { GoogleMap, Circle, Marker } from 'vue3-google-map'
import { ref, computed } from 'vue'

const props = defineProps({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  radius: {
    type: Number,
    required: true
  }
})

const config = useRuntimeConfig()
const apiKey = config.public.apiGoogleMaps

const coordinates = computed(() => ({
  lat: props.latitude,
  lng: props.longitude
}))

const markerOptions = computed(() => ({
  position: coordinates.value,
  icon: 'https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png'
}))

const circleOptions = computed(() => ({
  center: coordinates.value,
  radius: props.radius,
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
}))

const map = ref(null)
const onLoad = (mapInstance) => {
  map.value = mapInstance
}
</script>