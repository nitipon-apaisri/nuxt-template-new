// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    vite: {
        define: {
            global: "globalThis",
        },
        resolve: {
            alias: {
                buffer: "buffer",
            },
        },
    },
    css: ["~/assets/css/main.css"],
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n", "@nuxtjs/color-mode", "@vueuse/nuxt"],
    i18n: {
        defaultLocale: "en",
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "th", name: "Thai", file: "th.json" },
        ],
        strategy: "no_prefix",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            redirectOn: "root",
            alwaysRedirect: false,
        },
        vueI18n: "./i18n.config.ts",
    },
    colorMode: {
        preference: "light",
        fallback: "light",
        classSuffix: "",
    },
    ui: {
        theme: {
            colors: ["primary", "secondary", "info", "warning", "error", "success", "orange", "matcha", "purple"],
        },
    },
    devServer: {
        port: 3002,
    },
    app: {
        // head: {
        //     link: [
        //         {
        //             href: "https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined",
        //             rel: "stylesheet",
        //         },
        //         { rel: "manifest", href: "/manifest.webmanifest" },
        //         // Icon
        //         { rel: "icon", href: "/favicon.ico", sizes: "any" },
        //         { rel: "icon", type: "image/png", href: "/d-one-192.png" },
        //         // Apple Touch Icon
        //         { rel: "apple-touch-icon", href: "/d-one-512.png" },
        //         { rel: "apple-touch-icon", href: "/d-one-192.png" },
        //     ],
        //     meta: [
        //         { name: "theme-color", content: "#DDE6ED" },
        //         { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
        //     ],
        // },
    },
    // pwa: {
    //     // 1. Service Worker Registration
    //     registerType: "autoUpdate",

    //     manifest: {
    //         name: "Dynamic One Cosmic",
    //         short_name: "Dynamic One Cosmic",
    //         description: "Dynamic One Cosmic",
    //         background_color: "#ffffff",
    //         theme_color: "#DDE6ED",
    //         display: "standalone",
    //         icons: [
    //             {
    //                 src: "/d-one-192.png",
    //                 sizes: "192x192",
    //                 type: "image/png",
    //                 // purpose: 'maskable any',
    //             },
    //             {
    //                 src: "/d-one-512.png",
    //                 sizes: "512x512",
    //                 type: "image/png",
    //                 purpose: "maskable",
    //             },
    //         ],
    //     },

    //     workbox: {
    //         navigateFallback: "/",
    //         globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],

    //         // 👇 ADD THIS LINE 👇
    //         maximumFileSizeToCacheInBytes: 4194304, // 4 MB (4 * 1024 * 1024)
    //     },

    //     devOptions: {
    //         enabled: true,
    //         type: "module",
    //     },
    // },
    runtimeConfig: {
        public: {
            keycloakUrl: process.env.KEYCLOAK_URL,
            keycloakRealm: process.env.KEYCLOAK_REALM,
            keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
        },
    },
    components: true,
});
