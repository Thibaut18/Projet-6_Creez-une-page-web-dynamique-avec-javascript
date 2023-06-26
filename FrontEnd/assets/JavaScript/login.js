// Déclaration des variables
const $loginForm = document.querySelector("#js-login-form");
const $errorMessage = document.querySelector("#js-error-message");
const $connectButton = document.querySelector("#js-connect-button");
const $emailField = $loginForm.querySelector("#js-email");
const $passwordField = $loginForm.querySelector("#js-password");

/**
 * Gère la soumission du formulaire de connexion.
 * @param {Event} event - L'événement de soumission du formulaire.
 * @returns {void}
 */
const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    /**
     * Récupère les valeurs des champs email et password.
     * @type {string}
     */
    const email = $emailField.value;
    const password = $passwordField.value;

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.status === 200) {
            const data = await response.json();

            /**
             * Le token d'authentification.
             * @type {string}
             */
            const token = data.token;

            localStorage.setItem("token", token);
            window.location.href = "./index.html";
        } else {
            $errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
            $connectButton.classList.add("wrong-mdp-id");

            setTimeout(() => {
                $connectButton.classList.remove("wrong-mdp-id");
            }, 500);
        }
    } catch (error) {
        console.error(error);
    }
};

// Écoute l'événement de soumission du formulaire de connexion.
$loginForm.addEventListener("submit", handleLoginFormSubmit);
