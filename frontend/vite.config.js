import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    // Only configure the proxy in development
    server: {
      proxy: command === 'serve' ? {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } : undefined
    },
    // In production, the base URL will be determined by the environment variable
    base: command === 'build' ? env.VITE_BASE_URL || '/' : '/',
    define: {
      // Expose environment variables to your client-side code
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
    }
  }
})
