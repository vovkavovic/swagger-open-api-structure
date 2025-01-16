export async function loadApi() {
    const apiFiles = [
        './src/schemas/api/Order.json',
        './src/schemas/api/User.json'
    ];

    try {
        const apis = await Promise.all(
            apiFiles.map(file => 
                fetch(file).then(res => res.json())
            )
        );

        return apis.reduce((acc, curr) => ({
            ...acc,
            ...curr
        }), {});
    } catch (error) {
        console.error('Error loading components:', error);
        throw error;
    }
}