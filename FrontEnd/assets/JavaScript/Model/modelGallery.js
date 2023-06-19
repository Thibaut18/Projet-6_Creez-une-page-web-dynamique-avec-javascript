import { token } from "../Model/modelAuth.js";

// Suppression d'un élément de la galerie
const deleteGalleryItem = async (id) => {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { Authorization: `accept: ${token}` },
        });
        return true;
    } catch (error) {
        console.log("Erreur lors de la suppression de l'élément:", error);
        return false;
    }
};

export { deleteGalleryItem };