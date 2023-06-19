import { token } from "../Model/modelAuth.js";

export const elements = {
    galleryModal: document.querySelector("#js-gallery-modal"),
    addPicture: document.querySelector("#js-add-picture"),
    modalTitle: document.querySelector("#js-modal-title"),
    deleteGallery: document.querySelector("#js-delete-gallery"),
    formAddPicture: document.querySelector("#js-form-add-img"),
    backGallery: document.querySelector("#js-back-to-gallery"),
    barModal: document.querySelector("#js-bar-modal"),
};

export const fetchWorks = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur :", error);
    }
};

export const addGalleryItem = async (formData) => {
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) throw new Error('Erreur lors de la création d\'un nouvel élément');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur :", error);
    }
};

export const deleteGalleryItem = async (id) => {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) throw new Error('Erreur lors de la suppression de l\'élément de la galerie');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur :", error);
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur :", error);
    }
};
