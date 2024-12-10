<template lang="">
    <div class="flex flex-col flex-nowrap justify-center items-start h-dvh px-40">
        <h1 class="font-sans text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-12">Perfil Individual</h1>
        <div class="flex flex-row flex-nowrap justify-around w-full">
            <div name="userInformationCard" class="bg-gray-100 rounded-lg shadow-lg p-6 text-2xl [&>strong]:font-bold text-gray-700 text-left">
                <p><strong>Name: </strong>Lorem Ipsum</p>
                <p><strong>Latitude: </strong>Lorem Ipsum</p>
                <p><strong>Longitude: </strong>Lorem Ipsum</p>
                <p><strong>Radius Meters: </strong>Lorem Ipsum</p>
                <p><strong>Address: </strong>Lorem Ipsum</p>
                <p><strong>Country: </strong>Lorem Ipsum</p>
                <p><strong>City: </strong>Lorem Ipsum</p>
                <p><strong>Province: </strong>Lorem Ipsum</p>
                <p><strong>Microbs: </strong>Lorem Ipsum</p>
                <p><strong>Zip: </strong>Lorem Ipsum</p>
                <p><strong>Notes: </strong>Lorem Ipsum</p>
            </div>
            <div>
                <div class="mb-12">
                    <select name="distance">
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                    </select>
                </div>
                <div class="bg-gray-100 rounded-lg shadow-lg p-6 w-72">
                    <Map />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  import Map from '~/components/GoogleMapView.vue'
</script>
