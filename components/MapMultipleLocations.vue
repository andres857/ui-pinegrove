<template>
    <client-only>
      <GoogleMap
        :api-key="apiKey"
        :center="center"
        :zoom="12"
        style="width: 100%; height: 100%;"
        @load="onLoad"
      >
        <!-- Render a marker and circle for each location -->
        <template v-for="(location, index) in locations" :key="index">
          <Marker 
            :options="getMarkerOptions(location, index)" 
            @click="() => handleMarkerClick(index)"
          />
          <Circle v-if="isGoogleMapsLoaded" :options="getCircleOptions(location, index)" />
        </template>
      </GoogleMap>
    </client-only>
</template>
    
<script setup>
    import { useRuntimeConfig } from '#app';
    import { GoogleMap, Circle, Marker } from 'vue3-google-map';
    import { ref, computed, watch } from 'vue';

    const isGoogleMapsLoaded = ref(false);

    const props = defineProps({
        // Accept an array of locations instead of single coordinates
        locations: {
            type: Array,
            required: true,
            // Each location should have lat, lng, radius, timestamp, and status
            default: () => []
        },
        // Optional active index to highlight a specific location
        activeIndex: {
            type: Number,
            default: 0
        }
    });

    const emit = defineEmits(['marker-click']);

    const config = useRuntimeConfig();
    const apiKey = config.public.apiGoogleMaps;
    const map = ref(null);
    
    // Calculate the center of the map based on the first (most recent) location
    const center = computed(() => {
        if (props.locations.length === 0) return { lat: 0, lng: 0 };
        return {
            lat: props.locations[props.activeIndex]?.lat || 0,
            lng: props.locations[props.activeIndex]?.lng || 0
        };
    });

    // Status colors mapping
    const statusColors = {
        'origin': '#00AA55',     // Green
        'intransit': '#88C700',  // Light green
        'warning': '#FFAA00',    // Yellow
        'alert': '#FF5555'       // Red
    };

    // Get color based on location status or index if no status provided
    const getLocationColor = (location, index) => {
        // If location has a status, use corresponding color
        if (location.status && statusColors[location.status.toLowerCase()]) {
            return statusColors[location.status.toLowerCase()];
        }
        
        // Fallback: color gradient based on index (most recent = green, oldest = red)
        const colors = ['#00AA55', '#88C700', '#CCDD00', '#FFCC00', '#FFAA00', '#FF8800', '#FF5500', '#FF0000'];
        return colors[Math.min(index, colors.length - 1)];
    };

    // Generate marker options for a location
    const getMarkerOptions = (location, index) => {
        const isActive = index === props.activeIndex;
        
        // Determine icon color based on status
        let iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/red-dot.png';
        
        // Map status to Google Maps marker colors
        if (location.status) {
            switch(location.status.toLowerCase()) {
                case 'origin':
                    iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/green-dot.png';
                    break;
                case 'intransit':
                    iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/green-dot.png';
                    break;
                case 'warning':
                    iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/yellow-dot.png';
                    break;
                case 'alert':
                    iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/red-dot.png';
                    break;
                default:
                    iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png';
            }
        } else if (index === 0) {
            // Latest location gets blue marker
            iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png';
        }
        
        // Use active marker for the selected location
        if (isActive) {
            // We still use blue for active markers but make them larger
            iconUrl = 'https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png';
        }
        
        return {
            position: { lat: location.lat, lng: location.lng },
            icon: {
                url: iconUrl,
                scaledSize: isActive ? {width: 42, height: 42} : {width: 32, height: 32}
            },
            zIndex: isActive ? 1000 - index : 100 - index // Ensure active marker is on top
        };
    };

    // Handle marker click
    const handleMarkerClick = (index) => {
        emit('marker-click', index);
    };

    // Map initialization
    const onLoad = (mapInstance) => {
        map.value = mapInstance;
        isGoogleMapsLoaded.value = true;
        
        // If we have locations, fit the map bounds to include all markers
        if (map.value && props.locations.length > 0 && window.google && window.google.maps) {
            try {
                const bounds = new window.google.maps.LatLngBounds();
                props.locations.forEach(location => {
                    bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
                });
                map.value.fitBounds(bounds);
            } catch (error) {
                console.error('Error setting map bounds:', error);
            }
        }
    };

    // Watch for changes to activeIndex to center the map
    watch(() => props.activeIndex, (newIndex) => {
        if (map.value && props.locations[newIndex]) {
            map.value.panTo({
                lat: props.locations[newIndex].lat,
                lng: props.locations[newIndex].lng
            });
        }
    });
    
    // Safely access Google Maps API
    const getCircleOptions = (location, index) => {
        const color = getLocationColor(location, index);
        const isActive = index === props.activeIndex;
        
        return {
            center: { lat: location.lat, lng: location.lng },
            radius: location.radius || 1000,
            strokeColor: color,
            strokeOpacity: isActive ? 0.8 : 0.5,
            strokeWeight: isActive ? 2 : 1,
            fillColor: color,
            fillOpacity: isActive ? 0.3 : 0.1,
            zIndex: isActive ? 500 - index : 50 - index
        };
    };
</script>