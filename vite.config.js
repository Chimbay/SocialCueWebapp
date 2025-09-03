import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: { https: true }, // Not needed for Vite 5+
  plugins: [mkcert(), tailwindcss()],
});
