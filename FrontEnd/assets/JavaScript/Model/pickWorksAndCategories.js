/**
 * Récupère les œuvres depuis l'API.
 * @async
 * @returns {Promise<object[]>} La liste des œuvres.
 */
export async function fetchWorks() {
    try {
        const $response = await fetch('http://localhost:5678/api/works');
        return $response.json();
    } catch (error) {
        console.error(error)
    }
}

/**
 * Récupère les catégories depuis l'API.
 * @async
 * @returns {Promise<object[]>} La liste des catégories.
 */
export async function fetchCategories() {
    try {
        const $response = await fetch('http://localhost:5678/api/categories');
        return $response.json();
    } catch (error) {
        console.error(error)
    }
}