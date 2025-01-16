export async function loadPaths() {
    const pathFiles = [
        './src/paths/users.json',
    ];

    try {
        const paths = await Promise.all(
            pathFiles.map(file => 
                fetch(file).then(res => res.json())
            )
        );

        return paths.reduce((acc, curr) => ({
            ...acc,
            ...curr
        }), {});
    } catch (error) {
        console.error('Error loading components:', error);
        throw error;
    }
}