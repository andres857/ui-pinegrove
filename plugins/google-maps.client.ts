// import { Loader } from '@googlemaps/js-api-loader';

// export default defineNuxtPlugin(async (nuxtApp) => {
//     const config = useRuntimeConfig();
//     const apiKey = config.public.apiGoogleMaps;

//     const loader = new Loader({
//         apiKey,
//         version: 'weekly',
//         libraries: ['places', 'geometry']
//     });

//     try {
//         await loader.load();
//         console.log('Google Maps API cargada correctamente');
//     } catch (error) {
//         console.error('Error al cargar Google Maps API:', error);
//     }

//     return {
//         provide: {
//             googleMaps: {
//                 loader,
//                 isLoaded: true
//             }
//         }
//     };
// }); 