import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
  base: '/<https://github.com/s-k3nyyy/s-k3nyyy-phase4-project-frontend-client.github.io.git>/', 
});
