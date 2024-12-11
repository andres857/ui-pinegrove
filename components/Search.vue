<template>
    <div class="relative">
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
    </div>
</template>