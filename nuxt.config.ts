// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
  ],
  colorMode: { classSuffix: "" },
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
  imports: {
    dirs: ["stores"],
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      exclude: ['/signup'],
    },
  },
  runtimeConfig: {
    public: {
      redirectUrl: process.env.NUXT_PUBLIC_REDIRECT_URL,
    },
  },
});
