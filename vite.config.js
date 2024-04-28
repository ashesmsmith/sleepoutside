import { resolve } from "path";
import { defineConfig } from "vite";
import * as fs from "fs";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html")
      },
    },
    plugins: [],
  },
  plugins: [
    {
      name: "copy-json-to-dist",
      writeBundle() {
        const destDir = resolve(__dirname, "dist/json");

        // Create the dist/json folder if it doesn't exist
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        fs.copyFileSync(
          resolve(__dirname, "src/json/tents.json"),
          resolve(__dirname, "dist/json/tents.json"),
        );
      },
    },
  ],
});
