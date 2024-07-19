import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'repository-name' with the actual name of your repository
const basePath = '/repository-name/';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html', // Ensure this path is correct
    },
  },
  base: basePath,
});
