import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [reactRouter()],
    server: {
        host: '0.0.0.0',
        port: 8080,
        watch: {
            usePolling: true,
            interval: 100
        },
        allowedHosts: [
            "host.docker.internal",
            "localhost",
        ]
    }
});
