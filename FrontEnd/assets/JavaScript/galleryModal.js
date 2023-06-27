/**
 * Crée les éléments de la galerie dans la modal
 * @param {GalleryModalItem[]} data - Les données de la galerie
 */

const createGalleryModalItems = (data) => {
    const fragment = document.createDocumentFragment();

    for (const item of data) {
        const $boxModal = document.createElement("div");
        $boxModal.classList.add("box-modal");
        $boxModal.setAttribute("data-id", item.id);
        // Créer une nouvelle image pour chaque élément de la galerie
        const $modalItemImg = document.createElement("img");
        $modalItemImg.classList.add("modal-item__img"); 
        $modalItemImg.src = item.imageUrl; 
        $modalItemImg.alt = item.title; 

        const $modalEditBtn = document.createElement("button");
        $modalEditBtn.classList.add("modal-edit-btn");
        $modalEditBtn.innerText = "éditer";

        const $modalDeleteBtn = document.createElement("button");
        $modalDeleteBtn.classList.add("modal-delete-btn");
        $modalDeleteBtn.setAttribute("aria-label", "delete");

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
        $modalDeleteImg.src = "./assets/icons/trash.svg";
        $modalDeleteImg.alt = "delete"; 
        $modalDeleteBtn.appendChild($modalDeleteImg);
        $boxModal.append($modalItemImg, $modalEditBtn, $modalDeleteBtn);
        fragment.appendChild($boxModal);
    }
    $modalElements.galleryModal.appendChild(fragment);
};

const updateModalElements = (data) => {
    $modalElements.modalTitle.textContent = "Galerie photo";
    $modalElements.galleryModal.style.display = "flex";
    $modalElements.deleteGallery.style.display = "block";
    $modalElements.addPicture.style.display = "block";
    $modalElements.formAddPicture.style.display = "none";
    $modalElements.backGallery.style.display = "none";
    $modalElements.barModal.style.display = "block";
    $modalElements.galleryModal.innerHTML = "";
    createGalleryModalItems(data);
};

// Fonction pour supprimer un élément de la galerie
const deleteGalleryItem = async (id) => {
    try {
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

// Suppression de toute la galerie et mise à jour de l'API, de la galerie dans la modal et de la galerie principale
$modalElements.deleteGallery.addEventListener("click", () => {
    getAllWorks()
        .then((data) => {
            return Promise.all(data.map((element) => deleteGalleryItem(element.id)));
        })
        .then(() => {
            getAllWorks().then((data) => {
                $modalElements.galleryModal.innerHTML = "";
                createGalleryModalItems(data);
                renderGallery(data);
            });
        });
});
