import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import laravel from "vite-plugin-laravel";

export default defineConfig({
    server: {
        host: '0.0.0.0'
    },
    plugins: [
        reactRefresh(),
        laravel(),
    ],
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            '@inertiajs/inertia',
            '@inertiajs/inertia-react',
        ],
    },
})
