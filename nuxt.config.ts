// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      clientId: process.env.CLIENT_ID,
      apiBase: process.env.PUBLIC_API,
      apiGoogleMaps: process.env.API_GOOGLE_MAPS
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  plugins: [
    { src: '~/plugins/flowbite.client.js', mode: 'client' }
  ],
  css: ['~/assets/css/input.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

})
