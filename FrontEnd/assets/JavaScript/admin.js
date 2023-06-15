const modalElements = {
    galleryModal: document.querySelector("#js-gallery-modal"),
    addPicture: document.querySelector("#js-add-picture"),
    modalTitle: document.querySelector("#js-modal-title"),
    deleteGallery: document.querySelector("#js-delete-gallery"),
    formAddPicture: document.querySelector("#js-form-add-img"),
    backGallery: document.querySelector("#js-back-to-gallery"),
    barModal: document.querySelector("#js-bar-modal"),
};

const token = localStorage.getItem("token");
const $errorTitle = document.querySelector(".bordertitle-error");
const $errorTitleText = document.querySelector(".error-title-form");
const $modalContainer = document.querySelector(".modal-container");
const $modalTriggers = document.querySelectorAll(".modal-trigger");
const $preview = document.getElementById("preview");
const $buttonUploadPhoto = document.querySelector(".button-upload-photo");
const $textFormatImg = document.querySelector("#text-format-img");
const $previewDeleteBtn = document.querySelector("#js-delete-preview");
const $fileInput = document.querySelector("#file-input");
const $titreInput = document.getElementById("titre");
const $categorieSelect = document.getElementById("categorie");
const $submitBtn = document.querySelector(".confirm-button-form-add");

document.addEventListener('DOMContentLoaded', (event) => {

    const $uploadButton = document.querySelector("#uploadButton"); 

    if ($uploadButton) { 
        $uploadButton.addEventListener('click', function() {
            $fileInput.click();
        });
    }
});

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
        // Écouteur d'événements sur le bouton de suppression
        $modalDeleteBtn.addEventListener("click", () => {
            // Appeler une fonction pour supprimer l'élément
            deleteGalleryItem(item.id)
                .then((isDeleted) => {
                    if (isDeleted) {
                        // Supprimer l'élément du DOM
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

        const $modalDeleteImg = document.createElement("img");
        $modalDeleteImg.src = "./assets/icons/trash.svg";
        $modalDeleteImg.alt = "delete";

        $modalDeleteBtn.appendChild($modalDeleteImg);
        $boxModal.append($modalItemImg, $modalEditBtn, $modalDeleteBtn);
        fragment.appendChild($boxModal);
    }

    modalElements.galleryModal.appendChild(fragment);
};

/**
 * Met à jour les éléments de la modal
 * @param {GalleryModalItem[]} data - Les données de la galerie
 */
const updateModalElements = (data) => {
    modalElements.modalTitle.textContent = "Galerie photo";

    modalElements.galleryModal.style.display = "flex";
    modalElements.deleteGallery.style.display = "block";
    modalElements.addPicture.style.display = "block";
    modalElements.formAddPicture.style.display = "none";
    modalElements.backGallery.style.display = "none";
    modalElements.barModal.style.display = "block";

    modalElements.galleryModal.innerHTML = "";
    createGalleryModalItems(data);
};

/**
 * Vérifie si l'utilisateur est connecté (admin)
 * @returns {boolean} - True si l'utilisateur est connecté, sinon False
 */
const isLogged = () => !!token;

/**
 * Déconnexion de l'utilisateur (admin)
 */
const logOut = () => {
    localStorage.clear("token");
    console.log("Déconnecté");
    window.location.reload();
};

/**
 * Met à jour le bouton de connexion/déconnexion
 */
const updateLoginButton = () => {
    const $loginButton = document.querySelector("#js-login-button");
    if (isLogged()) {
        $loginButton.href = "#";
        $loginButton.innerText = "logout";
        $loginButton.addEventListener("click", () => {
            logOut();
            $loginButton.innerText = "Connexion";
        });
    }
};

/**
 * Met à jour l'interface utilisateur (UI) si l'utilisateur est connecté (admin)
 */
const updateUI = () => {
    const $filter = document.querySelector("#js-filter-box");
    const $editBar = document.querySelector("#js-edit-mode");
    const $alignItems = document.querySelector("#introduction");
    const $buttonEditGallery = document.querySelector("#js-button-edit-gallery");
    const $buttonEditProfil = document.querySelector("#js-button-edit-profil");
    const $buttonEditDescription = document.querySelector("#js-button-edit-description");

    if (isLogged()) {
        $filter.style.display = "none";
        $editBar.style.display = "flex";
        $alignItems.style.alignItems = "inherit";
        $buttonEditDescription.style.display = "inline-flex";
        $buttonEditGallery.style.display = "inline-flex";
        $buttonEditProfil.style.display = "inline-flex";
    }
};

// Événement de chargement de la page
window.addEventListener("load", () => {
    updateLoginButton();
    updateUI();
});

// Gestion de la modal de la galerie

// Affichage/masquage de la modal
$modalTriggers.forEach(($trigger) =>
    $trigger.addEventListener("click", () => {
        $modalContainer.classList.toggle("active");
    })
);

fetchWorks().then((data) => {
    // Mise à jour de la galerie dans la modal
    createGalleryModalItems(data);
});

fetchWorks().then(() => {
    // Passage à la section d'ajout d'une photo dans la modal
    modalElements.addPicture.addEventListener("click", () => {
        modalElements.modalTitle.textContent = "Ajout Photo";
        modalElements.galleryModal.style.display = "none";
        modalElements.deleteGallery.style.display = "none";
        modalElements.addPicture.style.display = "none";
        modalElements.formAddPicture.style.display = "flex";
        modalElements.backGallery.style.display = "block";
        modalElements.barModal.style.display = "none";
    });

    // Retour à la galerie dans la modal avec mise à jour
    modalElements.backGallery.addEventListener("click", () => {
        updateModalElements();

        fetchWorks().then((data) => {
            modalElements.galleryModal.innerHTML = "";
            createGalleryModalItems(data);
        });
    });
});

// Suppression d'un élément de la galerie

/**
 * Appelle l'API pour supprimer un élément
 * @param {string} id - L'identifiant de l'élément à supprimer
 * @returns {Promise<boolean>} - Promise résolue à true si la suppression est réussie, sinon false
 */
const deleteGalleryItem = async (id) => {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { Authorization: `accept: ${token}` },
        });
        return true;
    } catch (error) {
        console.log("Erreur");
        return false;
    }
};

// Ajout d'une photo dans la galerie

/**
 * Appelle l'API pour ajouter un nouvel élément
 * @param {FormData} formData - Les données du formulaire
 * @returns {Promise<void>}
 */
const addGalleryItem = async (formData) => {
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 201) {
            // Mise à jour de la galerie dans la modal en cas de succès
            fetchWorks().then((data) => {
                updateModalElements(data);
            });

            // Petite attente pour mettre à jour la galerie dans la modal et permettre une transition fluide
            setTimeout(() => {
                // Mise à jour de la galerie dans la modal
                modalElements.modalTitle.textContent = "Galerie photo";
                modalElements.galleryModal.style.display = "flex";
                modalElements.deleteGallery.style.display = "block";
                modalElements.addPicture.style.display = "block";
                modalElements.formAddPicture.style.display = "none";
                modalElements.backGallery.style.display = "none";
                modalElements.barModal.style.display = "block";

                // Suppression de l'image de prévisualisation
                $preview.style.display = "none";
                $preview.src = "";
                $buttonUploadPhoto.style.display = "block";
                $textFormatImg.style.display = "block";
                $previewDeleteBtn.style.display = "none";

                // Réinitialisation du formulaire
                $formAddPicture.reset();
                $submitBtn.setAttribute("disabled", "disabled");
                $submitBtn.classList.remove("active");
            }, 400);
        }
    } catch (error) {
        console.log(error);
    }
};

// Soumission du formulaire d'ajout d'une photo
$submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const fileImg = $fileInput.files[0];
    const titleImg = $titreInput.value;
    const categoryImg = $categorieSelect.value;

    // Données du formulaire à envoyer à l'API
    const formData = new FormData();

    formData.append("image", fileImg);
    formData.append("title", titleImg);
    formData.append("category", categoryImg);

    // Validation du formulaire
    const isFormValid = titleImg !== "" && fileImg !== undefined;

    if (!isFormValid) {
        // Ajout de la classe "active" aux messages d'erreur si le formulaire est vide
        $errorTitleText.classList.add("active");
        $errorTitle.classList.add("active");
    } else {
        // Envoi des données à l'API et mise à jour de la galerie dans la modal en cas de succès
        addGalleryItem(formData).then(() => {
            fetchWorks().then((data) => {
                $errorTitleText.classList.remove("active");
                $errorTitle.classList.remove("active");
                renderGallery(data);
                $modalContainer.classList.remove("active");

                modalElements.galleryModal.innerHTML = "";
                createGalleryModalItems(data);
            });
        });
    }
});

// Fonction de prévisualisation de l'image
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        $preview.style.display = "block";
        $preview.src = URL.createObjectURL(file);
        $buttonUploadPhoto.style.display = "none";
        $textFormatImg.style.display = "none";
        $previewDeleteBtn.style.display = "inline-flex";
    } else {
        $preview.style.display = "none";
        $preview.src = "";
        $buttonUploadPhoto.style.display = "block";
        $textFormatImg.style.display = "block";
        $previewDeleteBtn.style.display = "none";
    }
}

// Suppression de l'image de prévisualisation
$previewDeleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    $preview.src = "";
    $preview.style.display = "none";
    $buttonUploadPhoto.style.display = "block";
    $textFormatImg.style.display = "block";
    $previewDeleteBtn.style.display = "none";
    $submitBtn.setAttribute("disabled", "disabled");
    $submitBtn.classList.remove("active");
    $formAddPicture.reset();
    $errorTitle.classList.remove("active");
    $errorTitleText.classList.remove("active");
});

// Événement de changement de l'input de sélection de fichier pour la prévisualisation de l'image
$fileInput.addEventListener("change", previewImage);

fetchCategories().then((data) => {
    const categories = document.querySelector("#categorie");
    // Création des options du select à partir des catégories de l'API
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].id;
        option.textContent = data[i].name;
        categories.appendChild(option);
    }
});

// Désactivation du bouton de soumission si le formulaire est vide
$submitBtn.disabled = true;

const $formAddPicture = document.querySelector("#js-form-add-img");

$formAddPicture.addEventListener("input", () => {
    const isFormValid = $fileInput.value !== "" && $categorieSelect.value !== "";
    if (isFormValid) {
        $submitBtn.removeAttribute("disabled");
        $submitBtn.classList.add("active");
    } else {
        $submitBtn.setAttribute("disabled", "disabled");
        $submitBtn.classList.remove("active");
    }
});

// Suppression de toute la galerie et mise à jour de l'API, de la galerie dans la modal et de la galerie principale
modalElements.deleteGallery.addEventListener("click", () => {
    fetchWorks()
        .then((data) => {
            return Promise.all(data.map((element) => deleteGalleryItem(element.id)));
        })
        .then(() => {
            fetchWorks().then((data) => {
                modalElements.galleryModal.innerHTML = "";
                createGalleryModalItems(data);
                renderGallery(data);
            });
        });
});

