<template>
  <div class="absolute w-full top-0 left-0">
    <!-- Trigger button -->
    <div @click="toggleModal">
      <slot name="trigger">
        <!-- Botón por defecto si no se proporciona un trigger personalizado -->
        <button class="flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
          </svg>
        </button>
      </slot>
    </div>

    <!-- Modal -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
    >
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal">
        
      </div>

      <!-- Modal Content -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
          <!-- Header -->
          <div class="flex justify-between items-center p-6 bg-gray-700 text-gray-100 tracking-wider leading-tight font-semibold">
            <h3 class="text-lg">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button 
              @click="closeModal"
              class="text-gray-100 hover:text-gray-300 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fill-rule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clip-rule="evenodd" 
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 bg-gray-100">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue';

  interface Props {
    title?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Modal'
  })

  const isOpen = ref<boolean>(false)

  const toggleModal = (): void => {
    isOpen.value = !isOpen.value;
  }

  const closeModal = (): void => {
    isOpen.value = false;
  }

  defineExpose({
    closeModal,
    toggleModal,
    isOpen
  })
</script>