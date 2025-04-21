<template>
    <div>
        <Navbar/>
        <div class="grid gap-y-4 px-40">
            <h1 class="text-5xl font-bold tracking-wider leading-tight text-gray-700 sm:text-3xl md:text-4xl lg:text-5xl mb-4">Devices</h1>

            <div v-if="!isLoading" class="w-full">
                <div class="relative mb-4">
                    
                    <input
                        v-model="searchValue"
                        class="px-5 py-3 pl-10 text-gray-700 placeholder-gray-400 bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md w-2/5"
                        placeholder="Search device..."
                    />
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    
                    <div class=" mt-4">
                        <EasyDataTable
                            @click-row="handleRowClick"
                            :headers="headers"
                            :items="dataFormatted"
                            :search-value="searchValue"
                            :loading="isLoading"
                            :items-per-page="itemsPerPage"
                            :rows-items="[5,10,15,20]"
                            :rows-per-page="10"
                            alternating
                            buttons-pagination
                            show-index
                        >
                            <!-- Use the item slot syntax for the status column -->
                            <template #item-status="{ status }">
                                <StatusIconDevice :status="status" style="margin-left: 8px;" />
                            </template>
                        </EasyDataTable>

                    </div>
                    
                </div>
            </div>
            <SpinnerLoader :isLoading="isLoading" message="Loading devices..." />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useDevices } from '~/composables/usedevices';
    import Navbar from '~/components/Navbar.vue';
    import type { Header } from "vue3-easy-data-table";
    import StatusIconDevice from '~/components/StatusIconDevice.vue';
    import SpinnerLoader from '~/components/loaders/SpinnerLoader.vue';
    import type { SigfoxDevice } from '~/types/device';

    const clientId = '51742590-5703-4a34-a2ba-f8a7bc863981'
    const { dataFormatted, isLoading, error } = useDevices(clientId)
    console.log('isloading', isLoading);
    const router = useRouter()

    const searchValue = ref('')
    const itemsPerPage = ref(10)

    const headers: Header[] = [
        { text: 'Status', value: 'status' },
        { text: "Sigfox ID", value: "SigfoxId" },
        { text: "Type", value: "aliasDeviceType" },
        { text: "Name", value: "friendlyName" },
        { text: "Last Location", value: "lastLocation.locationName" },
        { 
            text: "Last Seen",
            value: "formattedTimestamp",
            sortable: true
        },
    ];

    const handleRowClick = (item: SigfoxDevice) => {
        console.log('Row clicked:', item.status);
        
        router.push({
            path: `/devices/${item.deviceId}`,
            query: { deviceStatus: item.status }
        });
    }

</script>

<style scoped>
    :deep(.vue3-easy-data-table__tbody tr) {
        cursor: pointer;
    }

    :deep(.vue3-easy-data-table__tbody tr:hover) {
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>