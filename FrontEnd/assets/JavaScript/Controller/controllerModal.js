import { renderGallery } from '../View/renderGallery.js';
import { updateLoginButton } from '../View/viewAuth.js';
import { createGalleryModalItems } from '../View/viewGallery.js';
import { isLogged } from '../Model/modelAuth.js';

import {
    $errorTitle,
    $errorTitleText,
    $modalContainer,
    $modalTriggers,
    $preview,
    $buttonUploadPhoto,
    $textFormatImg,
    $previewDeleteBtn,
    $fileInput,
    $titreInput,
    $categorieSelect,
    $submitBtn,
    updateUI,
    updateModalElements,
    renderCategories,
    resetPreview,
    previewImage,
    showErrorMessage
} from '../View/viewModal.js';

import {
    elements,
    fetchWorks,
    addGalleryItem,
    deleteGalleryItem,
    fetchCategories,
} from '../Model/modelModal.js';

window.addEventListener("load", () => {
    updateLoginButton();
    updateUI(isLogged());
});

$modalTriggers.forEach(($trigger) =>
    $trigger.addEventListener("click", () => {
        $modalContainer.classList.toggle("active");
    })
);

fetchWorks().then((data) => {
    createGalleryModalItems(data);
});

fetchWorks().then(() => {
    elements.addPicture.addEventListener("click", () => {
        elements.modalTitle.textContent = "Ajout Photo";
        elements.galleryModal.style.display = "none";
        elements.deleteGallery.style.display = "none";
        elements.addPicture.style.display = "none";
        elements.formAddPicture.style.display = "flex";
        elements.backGallery.style.display = "block";
        elements.barModal.style.display = "none";
    });

    elements.backGallery.addEventListener("click", () => {
        updateModalElements();

        fetchWorks().then((data) => {
            elements.galleryModal.innerHTML = "";
            createGalleryModalItems(data);
        });
    });
});

$submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const fileImg = $fileInput.files[0];
    const titleImg = $titreInput.value;
    const categoryImg = $categorieSelect.value;

    const formData = new FormData();

    formData.append("image", fileImg);
    formData.append("title", titleImg);
    formData.append("category", categoryImg);

    const isFormValid = titleImg !== "" && fileImg !== undefined;

    if (!isFormValid) {
        showErrorMessage();
    } else {
        addGalleryItem(formData).then(() => {
            fetchWorks().then((data) => {
                $errorTitleText.classList.remove("active");
                $errorTitle.classList.remove("active");
                resetPreview();
                $modalContainer.classList.remove("active");

                elements.galleryModal.innerHTML = "";
                createGalleryModalItems(data);
            });
        });
    }
});

$previewDeleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetPreview();
    $errorTitle.classList.remove("active");
    $errorTitleText.classList.remove("active");
});

$fileInput.addEventListener("change", previewImage);

fetchCategories().then((data) => {
    renderCategories(data);
});

$submitBtn.disabled = true;

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

elements.deleteGallery.addEventListener("click", () => {
    fetchWorks()
        .then((data) => {
            return Promise.all(data.map((element) => deleteGalleryItem(element.id)));
        })
        .then(() => {
            fetchWorks().then((data) => {
                elements.galleryModal.innerHTML = "";
                createGalleryModalItems(data);
                renderGallery(data);
            });
        });
});