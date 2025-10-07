export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.PUBLIC_API,
      apiGoogleMaps: process.env.API_GOOGLE_MAPS,
      idClient: process.env.ID_CLIENT,
      idInTransitLocation: process.env.ID_INSTRANSIT_LOCATION
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
