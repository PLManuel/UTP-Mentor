// @ts-check
import { defineConfig } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/login",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4324,
  },
  output: "server",
  adapter: vercel(),
})
