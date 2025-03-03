/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

// import tailwindcss from "@tailwindcss/vite";

// export default defineNuxtConfig({
//   devtools: { enabled: true },
//   css: ['~/assets/css/input.css'], // you'll have to create this file
//   vite: {
//     plugins: [
//       tailwindcss(),
//     ],
//   },
// });
