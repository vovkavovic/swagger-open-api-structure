import { loadPaths } from './paths/index.js';
import { loadApi } from './schemas/api/index.js';
import { loadComponents } from './schemas/components/index.js';

export async function loadOpenAPISpec() {
    try {
        const [api, components, paths] = await Promise.all([
            loadApi(),
            loadComponents(),
            loadPaths()
        ]);

        return {
            openapi: '3.0.0',
            info: {
                title: 'API Documentation',
                version: '1.0.0',
                description: 'API e documentazione dei componenti'
            },
            paths,
            components: {
                schemas: {
                    ...api,
                    ...components
                }
            }
        };
    } catch (error) {
        console.error('Error loading specification:', error);
        throw error;
    }
}