
const $submitBtn = document.querySelector(".confirm-button-form-add");
const $formAddPicture = document.querySelector("#js-form-add-img");
const $titreInput = document.getElementById("titre");
const $categorieSelect = document.getElementById("categorie");

/**
 * Cette fonction envoie une requête à l'API pour ajouter un nouvel élément dans la galerie.
 * @param {FormData} formData - Les données du formulaire à envoyer.
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
            await updateGalleryAndUI();
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Valide le formulaire en temps réel.
 */
const validateForm = () => {
    const isFormValid = $fileInput.value !== "" && $categorieSelect.value !== "";
    // Active le bouton de soumission si le formulaire est valide
    if (isFormValid) {
        $submitBtn.removeAttribute("disabled");
        $submitBtn.classList.add("active");
    } else {
        $submitBtn.setAttribute("disabled", "disabled");
        $submitBtn.classList.remove("active");
    }
};

$submitBtn.disabled = true;

// Ajoute un écouteur d'événement pour valider le formulaire en temps réel
$formAddPicture.addEventListener("input", validateForm);

// Gestionnaire d'événement pour la soumission du formulaire
$submitBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Empêche le comportement de soumission par défaut
    // Récupère les valeurs des champs du formulaire
    const fileImg = $fileInput.files[0];
    const titleImg = $titreInput.value;
    const categoryImg = $categorieSelect.value;
    // Crée un nouvel objet FormData et ajoute les valeurs des champs
    const formData = new FormData();
    formData.append("image", fileImg);
    formData.append("title", titleImg);
    formData.append("category", categoryImg);
    // Vérifie si le formulaire est valide
    const isFormValid = titleImg !== "" && fileImg !== undefined;
    if (!isFormValid) {
        // Montre les messages d'erreur si le formulaire n'est pas valide
        $errorTitleText.classList.add("active");
        $errorTitle.classList.add("active");
        return;
    }
    // Envoie les données du formulaire et met à jour la galerie et l'UI
    await addGalleryItem(formData);
    await updateGalleryAndUI();
    // Masque les messages d'erreur
    $errorTitleText.classList.remove("active");
    $errorTitle.classList.remove("active");
});

