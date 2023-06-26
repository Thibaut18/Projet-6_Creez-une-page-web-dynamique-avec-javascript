/**
 * Crée les éléments de la galerie dans la modal
 * @param {GalleryModalItem[]} data - Les données de la galerie
 */
// Créer les éléments de la galerie dans une fenêtre modale
const createGalleryModalItems = (data) => {
    // Créer un fragment de document qui permet de regrouper des noeuds DOM sans introduire un noeud parent supplémentaire
    const fragment = document.createDocumentFragment();

    // Parcourir les données de la galerie
    for (const item of data) {
        // Créer une nouvelle div pour chaque élément de la galerie
        const $boxModal = document.createElement("div");
        $boxModal.classList.add("box-modal"); // Ajouter la classe CSS
        $boxModal.setAttribute("data-id", item.id); // Ajouter un attribut data-id avec l'id de l'élément

        // Créer une nouvelle image pour chaque élément de la galerie
        const $modalItemImg = document.createElement("img");
        $modalItemImg.classList.add("modal-item__img"); // Ajouter la classe CSS
        $modalItemImg.src = item.imageUrl; // Définir l'URL de l'image
        $modalItemImg.alt = item.title; // Définir le texte alternatif de l'image

        // Créer un bouton d'édition pour chaque élément de la galerie
        const $modalEditBtn = document.createElement("button");
        $modalEditBtn.classList.add("modal-edit-btn"); // Ajouter la classe CSS
        $modalEditBtn.innerText = "éditer"; // Définir le texte du bouton

        // Créer un bouton de suppression pour chaque élément de la galerie
        const $modalDeleteBtn = document.createElement("button");
        $modalDeleteBtn.classList.add("modal-delete-btn"); // Ajouter la classe CSS
        $modalDeleteBtn.setAttribute("aria-label", "delete"); // Ajouter un attribut aria-label pour l'accessibilité

        // Ajouter un écouteur d'événements sur le bouton de suppression
        $modalDeleteBtn.addEventListener("click", () => {
            // Appeler une fonction pour supprimer l'élément
            deleteGalleryItem(item.id)
                .then((isDeleted) => {
                    if (isDeleted) {
                        // Si la suppression est réussie, supprimer l'élément du DOM
                        $boxModal.remove();
                        console.log("Elément supprimé");
                    } else {
                        console.log("Échec de la suppression");
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la suppression de l'élément:", error);
                });
        });

        // Créer une image pour le bouton de suppression
        const $modalDeleteImg = document.createElement("img");
        $modalDeleteImg.src = "./assets/icons/trash.svg"; // Définir l'URL de l'image
        $modalDeleteImg.alt = "delete"; // Définir le texte alternatif de l'image

        // Ajouter l'image au bouton de suppression
        $modalDeleteBtn.appendChild($modalDeleteImg);
        // Ajouter les éléments image, bouton d'édition et bouton de suppression à la div
        $boxModal.append($modalItemImg, $modalEditBtn, $modalDeleteBtn);
        // Ajouter la div au fragment de document
        fragment.appendChild($boxModal);
    }

    // Ajouter le fragment de document à la fenêtre modale de la galerie
    $modalElements.galleryModal.appendChild(fragment);
};

// Mettre à jour les éléments de la fenêtre modale
const updateModalElements = (data) => {
    // Définir le titre de la fenêtre modale
    $modalElements.modalTitle.textContent = "Galerie photo";

    // Afficher les éléments de la galerie
    $modalElements.galleryModal.style.display = "flex";
    $modalElements.deleteGallery.style.display = "block";
    $modalElements.addPicture.style.display = "block";

    // Cacher certains éléments de la fenêtre modale
    $modalElements.formAddPicture.style.display = "none";
    $modalElements.backGallery.style.display = "none";
    $modalElements.barModal.style.display = "block";

    // Vider le contenu de la fenêtre modale
    modalElements.galleryModal.innerHTML = "";
    // Appeler la fonction pour créer les éléments de la galerie
    createGalleryModalItems(data);
};

// Fonction pour supprimer un élément de la galerie
const deleteGalleryItem = async (id) => {
    try {
        // Effectuer une requête HTTP DELETE pour supprimer un élément par son identifiant
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { Authorization: `accept: ${token}` },
        });
        if (response.ok) {
            return true;
        } else {
            console.error("Erreur lors de la suppression de l'élément, statut:", response.status);
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'élément:", error);
        return false;
    }
};
