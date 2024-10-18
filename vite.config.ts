import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist', // output directory for types
      tsconfigPath: './tsconfig.json', // your tsconfig file
      insertTypesEntry: true, // add a types entry
    })
  ],
  build: {
    lib: {
      entry: './src/index.ts', // entry file for your library
      name: 'TestComponent',
      fileName: (format) => `test-component.${format}.js`,
      formats: ['es', 'umd'], // formats you want to generate
    }
  }
});
