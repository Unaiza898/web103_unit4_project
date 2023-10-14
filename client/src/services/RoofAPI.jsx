export const getAllRoof = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/roof`)
        return response.data;
    } catch (error) {
        throw error;
    }
};