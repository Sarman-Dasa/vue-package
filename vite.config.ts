// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist', // specify output directory for types
      tsconfigPath: './tsconfig.json', // ensure this points to your tsconfig file
      insertTypesEntry: true // optionally add an entry point for types
    })
  ],
  build: {
    lib: {
      entry: './src/index.ts', // path to your main entry file
      name: 'TestComponent',
      fileName: (format) => `test-component.${format}.js`,
      formats: ['es', 'umd'], // specify formats you want to generate
    }
  }
});
