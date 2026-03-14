// Vite configuration for the React frontend
// The react plugin enables JSX transform and React Fast Refresh during development

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
