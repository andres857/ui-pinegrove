<template>
  <svg width="16" height="16" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle 
      cx="22.5" 
      cy="22.5" 
      r="22.5" 
      :fill="status === 'Connected' ? '#14AE5C' : '#FF4B4B'"
    />
  </svg>
</template>

<script setup lang="ts">
  import { PropType, watch } from 'vue';

  const props = defineProps({
    status: {
      type: String as PropType<'Connected' | 'Disconnected'>,
      required: true,
      validator: (value: string): boolean => 
        ['Connected', 'Disconnected'].includes(value)
    }
  })

  // Add this to debug the status values
  watch(() => props.status, (newStatus) => {
    console.log('Status changed:', newStatus)
  })
</script>