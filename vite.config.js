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
        product1: resolve(
          __dirname,
          "src/product_pages/cedar-ridge-rimrock-2.html",
        ),
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/northface-alpine-3.html",
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/northface-talus-4.html",
        ),
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
