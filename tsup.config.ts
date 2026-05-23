import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/server.ts"],
    format: ["esm", "cjs"], // Keep This As ESM
    target: "esnext",
    outDir: "dist",
    clean: true,
    bundle: true,
    splitting: false,
    sourcemap: true,
    // Add This Banner To Shim Require() For CJS Dependencies
    banner: {
        js: `
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url);
  `,
    },
});

