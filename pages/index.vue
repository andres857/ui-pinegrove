<template>
    <div>
      <h1>Mapa de Bogotá</h1>
      <div class="map-container">
        <BogotaMap />
      </div>
    </div>
</template>
  
  <script setup>
  import BogotaMap from '~/components/GoogleMapView.vue'
</script>
  
<style scoped>
  .map-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
</style>