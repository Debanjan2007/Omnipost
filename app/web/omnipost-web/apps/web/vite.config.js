import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Internal app alias
      "@": path.resolve(__dirname, "./src"),
      // @repo/ui — point directly to source so Vite transpiles it
      // (avoids needing a separate build step for the shared package)
      "@repo/ui/button": path.resolve(
        __dirname,
        "../../shared/ui/src/button.tsx",
      ),
      "@repo/ui/logo": path.resolve(
        __dirname,
        "../../shared/ui/src/logo.tsx",
      ),
      "@repo/ui/nav-link": path.resolve(
        __dirname,
        "../../shared/ui/src/nav-link.tsx",
      ),
      "@repo/ui/card": path.resolve(
        __dirname,
        "../../shared/ui/src/card.tsx",
      ),
      "@repo/ui/code": path.resolve(
        __dirname,
        "../../shared/ui/src/code.tsx",
      ),
    },
  },
});
