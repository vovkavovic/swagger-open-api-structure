export async function loadComponents() {
    const componentFiles = [
        './src/schemas/components/Button.json',
        './src/schemas/components/Card.json'
    ];

    try {
        const components = await Promise.all(
            componentFiles.map(file => 
                fetch(file).then(res => res.json())
            )
        );

        return components.reduce((acc, curr) => ({
            ...acc,
            ...curr
        }), {});
    } catch (error) {
        console.error('Error loading components:', error);
        throw error;
    }
}