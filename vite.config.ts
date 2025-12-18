import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Inject the API key from the environment into the global process object
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});