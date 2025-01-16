import { swaggerConfig } from './src/swagger-config.js';
import { loadOpenAPISpec } from './src/open-api.js';
import { ComponentsPlugin } from './src/plugins/ComponentsPlugin.js';

async function initSwaggerUI() {
    try {
        const spec = await loadOpenAPISpec();
        const ui = SwaggerUIBundle({
            ...swaggerConfig,
            spec,
            plugins: [ComponentsPlugin]
        });
    } catch (error) {
        console.error('Failed to initialize Swagger UI:', error);
    }
}

document.addEventListener('DOMContentLoaded', initSwaggerUI);