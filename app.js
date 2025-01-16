import { swaggerConfig } from './src/swagger-config.js';
import { loadOpenAPISpec } from './src/open-api.js';

async function initSwaggerUI() {
    try {
        const spec = await loadOpenAPISpec();
        const ui = SwaggerUIBundle({
            ...swaggerConfig,
            spec
        });
    } catch (error) {
        console.error('Failed to initialize Swagger UI:', error);
    }
}

document.addEventListener('DOMContentLoaded', initSwaggerUI);