import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    {
      name: "force-https",
      transform(code, id) {
        if (id.endsWith(".js") || id.endsWith(".jsx") || id.endsWith(".tsx")) {
          return code.replace(/http:\/\//g, "https://");
        }
      },
    },
  ],
  base: "/",
});
