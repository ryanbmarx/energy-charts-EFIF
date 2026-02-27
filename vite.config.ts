import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
/// <reference types="vitest" />

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  base: '/energy-charts-EFIF/',
  resolve: {
    alias: {
      '@': '/src',
      $lib: '/src/lib',
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
