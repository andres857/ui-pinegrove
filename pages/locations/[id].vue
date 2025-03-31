<template >
    <Navbar/>
    <div class="grid grid-cols-3 px-40 gap-x-10 pb-10 font-sans">
        <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl self-center col-span-3 mb-10">Location</h1>
        <div name="userInformationCard" class="bg-gray-100 rounded-lg shadow-lg [&>strong]:font-bold text-gray-700 text-left row-start-2 row-span-4 overflow-hidden h-min">
            <h2 class="tracking-wider leading-tight font-semibold text-gray-100 bg-gray-700 py-5 text-center text-2xl">Information</h2>
            <div class="py-8 px-6 [&>div>p]:leading-10 [&>div>p]:text-lg relative group">
                <!-- COMPONENTE MODAL -->
                <Modal ref="modalRef">
                    <template #trigger>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-700 absolute right-0 mr-5 hover:text-gray-500 duration-300 cursor-pointer opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11 19A1 1 0 1011 21 1 1 0 1011 19zM15 19A1 1 0 1015 21 1 1 0 1015 19zM19 19A1 1 0 1019 21 1 1 0 1019 19zM10.517 5.892L3.369 16.29c-.103.149-.163.324-.174.505l-.193 3.144c-.021.351.143.688.432.886C3.604 20.94 3.801 21 4 21c.141 0 .283-.03.416-.091L7.28 19.6c.165-.075.306-.193.408-.343l7.161-10.417L10.517 5.892zM17.346 4.553c-.035-.119-.375-1.183-1.422-1.902-1.049-.721-2.166-.656-2.287-.645-.3.024-.574.183-.745.431L11.65 4.243l4.333 2.948 1.229-1.787C17.382 5.154 17.432 4.842 17.346 4.553z"/>
                            </svg>
                        </button>
                    </template>
                    <!-- TITULO PERSONALIZADO -->
                    <template #title>
                        Update data
                    </template>
                    <!-- CONTENIDO DEL MODAL -->
                    <div v-if='formData'>
                        <form @submit.prevent="updateDetails" method="post" enctype="multipart/form-data" class="space-y-6 mb-8 mx-4 mt-4">
                            <div>
                            <label class="block text-gray-700 text-lg font-semibold mb-3">
                                Latitude:
                            </label>
                            <input 
                                v-model="formData.latitude"
                                type="text"
                                name="latitude"
                                class="w-full px-3 py-2 border border-gray-200 focus:border-gray-200 rounded-md focus:outline-none
                                focus:ring-2 focus:ring-gray-700 transition-all text-gray-500 focus:text-gray-700"
                            >
                            </div>
                    
                            <div>
                            <label class="block text-gray-700 text-lg font-semibold mb-3">
                                Longitude:
                            </label>
                            <input 
                                v-model="formData.longitude"
                                type="text"
                                name="longitude"
                                class="w-full px-3 py-2 border border-gray-200 focus:border-gray-200 rounded-md focus:outline-none
                                focus:ring-2 focus:ring-gray-700 transition-all text-gray-500 focus:text-gray-700"
                            >
                            </div>
                    
                            <div class="mb-4">
                            <label class="block text-gray-700 text-lg font-semibold mb-3">
                                Radius Meters:
                            </label>
                            <input 
                                v-model="formData.radiusMeters"
                                type="text"
                                name="radiusMeters"
                                class="w-full px-3 py-2 border border-gray-200 focus:border-gray-200 rounded-md focus:outline-none
                                focus:ring-2 focus:ring-gray-700 transition-all text-gray-500 focus:text-gray-700"
                            >
                            </div>
                            <button 
                            type="submit"
                            class="w-full bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                            >
                            Update
                            </button>
                        </form>
                    </div>
                </Modal>
                <!-- Iteramos sobre las propiedades usando Object.entries -->
                <div v-if='locationInfo' v-for="[key, value] in Object.entries(locationInfo)" 
                    :key="key"
                    >
                    <p>
                        <strong>
                            {{ key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') }}:
                        </strong>                        
                        {{ value === null ? 'No disponible' : value }}
                    </p>
                </div>
                <div v-else> 
                    <p>Cargando datos</p>
                </div>
            </div>
        </div>
        <div class="grid auto-rows-max row-span-4 col-span-2 w-full">
            <div class="flex flex-row justify-self-end items-center gap-x-6 mb-5 h-fit">
                <h3 class="text-xl font-semibold tracking-wider leading-tight text-gray-700">Radius Meters: </h3>
                <select name="distance" class="appearance-none bg-gray-100 border-none text-gray-700 text-base rounded-md
                focus:ring-blue-500 focus:border-blue-500 p-4 [&>option]:text-gray-700 [&>option]:bg-gray-100">
                    <option disabled selected>Select Radius</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="5000">5000</option>
                    <option value="10000">10000</option>
                </select>
            </div>
            <div class="bg-gray-100 rounded-lg shadow-lg p-6 overflow-hidden h-[calc(60vh-50px)]">
                <Map 
                v-if="locationInfo"
                    :latitude="Number(locationInfo.latitude)" 
                    :longitude="Number(locationInfo.longitude)"
                    :radius="Number(locationInfo.radiusMeters)"
                />
                <!-- Puedes mostrar un mensaje de carga mientras no haya datos -->
                <div v-else>
                Cargando información de la ubicación...
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRuntimeConfig } from '#app'
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    import Map from '~/components/GoogleMapView.vue'
    import Id from '../devices/[id].vue'
    import Navbar from '~/components/Navbar.vue'
    import Modal from '~/components/ModalToggle.vue'

    // Definimos la interfaz para tipar los datos
    interface LocationDetail {
        id: string;
        name: string;
        address: string;
        country: string;
        city: string;
        province: string;
        microbs: string;
        zip: number;
        latitude: number;
        longitude: number;
        radiusMeters: number;
        notes: string | null;
        clientId: string | null;
        client: any | null;
    }
    interface LocationDetailsPrint {
        name: string;
        address: string;
        country: string;
        city: string;
        province: string;
        microbs: string;
        zip: number;
        latitude: number;
        longitude: number;
        radiusMeters: number;
        notes: string | null;
    }

    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    const route = useRoute()
    const locationId = route.params.id as string

    const locationInfo = ref<Partial<LocationDetail> | null>(null)
    const formData = ref<LocationDetailsPrint | null>(null)

    const modalRef = ref<InstanceType<typeof Modal> | null>(null)

    console.log('ID de ubicación:', locationId)

    // Aquí puedes agregar la lógica para cargar los detalles de la ubicación
    const loadLocationDetails = async () => {
        try {
            const response = await axios.get(`${apiBase}/locations/${locationId}`)
            locationInfo.value = response.data;
            if(locationInfo.value){
                delete locationInfo.value.id
                delete locationInfo.value.client
                delete locationInfo.value.clientId
            }
            loadUpdate()
        } catch (error) {
            console.error('Error al cargar los detalles:', error)
        }
    }
    const loadUpdate = () =>{
        if(locationInfo.value){
            formData.value = {
                name: locationInfo.value?.name || '',
                address: locationInfo.value?.address || '',
                country: locationInfo.value?.country || '',
                city: locationInfo.value?.city || '',
                province: locationInfo.value?.province || '',
                microbs: locationInfo.value?.microbs || '',
                zip: locationInfo.value?.zip || 0,
                latitude: locationInfo.value?.latitude || 0,
                longitude: locationInfo.value?.longitude || 0,
                radiusMeters: locationInfo.value?.radiusMeters || 0,
                notes: locationInfo.value?.notes || ''
            }
            }
    }
    const updateDetails = () => {
        if(formData.value){
            // Actualizar los datos
            locationInfo.value = {
                ...locationInfo.value,
                latitude: formData.value.latitude,
                longitude: formData.value.longitude,
                radiusMeters: formData.value.radiusMeters
            }
            axios.put(`${apiBase}/locations/${locationId}`,{
                latitude:locationInfo.value.latitude,
                longitude: locationInfo.value.longitude,
                radiusMeters: locationInfo.value.radiusMeters
            })
            modalRef.value?.closeModal()
        }      
    }

    onMounted(() => {
        loadLocationDetails()
    })
</script>
