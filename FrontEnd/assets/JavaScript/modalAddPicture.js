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
            getAllWorks().then((data) => {
                updateModalElements(data);
            });

            // Petite attente pour mettre à jour la galerie dans la modal et permettre une transition fluide
            setTimeout(() => {
                // Mise à jour de la galerie dans la modal
                $modalElements.modalTitle.textContent = "Galerie photo";
                $modalElements.galleryModal.style.display = "flex";
                $modalElements.deleteGallery.style.display = "block";
                $modalElements.addPicture.style.display = "block";
                $modalElements.formAddPicture.style.display = "none";
                $modalElements.backGallery.style.display = "none";
                $modalElements.barModal.style.display = "block";

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
            getAllWorks().then((data) => {
                $errorTitleText.classList.remove("active");
                $errorTitle.classList.remove("active");
                renderGallery(data);
                $modalContainer.classList.remove("active");

                $modalElements.galleryModal.innerHTML = "";
                createGalleryModalItems(data);
            });
        });
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
