import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This must match your GitHub repository name exactly
  // If your repo is https://github.com/User/portfolio, this should be '/portfolio/'
  // Example: if your repo is called "design-work", change this to: base: '/design-work/'
  base: '/my-portfolio', 
})