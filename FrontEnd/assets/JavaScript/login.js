/**
 * Gère la soumission du formulaire de connexion.
 * @param {Event} event - L'événement de soumission du formulaire.
 * @returns {void}
 */
const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    /**
     * L'élément du formulaire de connexion.
     * @type {HTMLFormElement}
     */
    const $loginForm = document.querySelector("#js-login-form");

    /**
     * L'élément affichant les messages d'erreur.
     * @type {HTMLElement}
     */
    const $errorMessage = document.querySelector("#js-error-message");

    /**
     * Le bouton de connexion.
     * @type {HTMLButtonElement}
     */
    const $connectButton = document.querySelector("#js-connect-button");

    /**
     * Récupère les valeurs des champs email et password.
     * @type {string}
     */
    const $email = $loginForm.querySelector("#js-email").value;
    const $password = $loginForm.querySelector("#js-password").value;

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                email: $email,
                password: $password,
            }),
        });

        if (response.status === 200) {
            const data = await response.json();

            /**
             * Le token d'authentification.
             * @type {string}
             */
            const $token = data.token;

            localStorage.setItem("token", $token);
            window.location.href = "./index.html";
            console.log($token);
        } else {
            $errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
            $connectButton.classList.add("shake");

            setTimeout(() => {
                $connectButton.classList.remove("shake");
            }, 500);
        }
    } catch (error) {
        console.log(error);
    }
};

// Écoute l'événement de soumission du formulaire de connexion.
const $loginForm = document.querySelector("#js-login-form");
$loginForm.addEventListener("submit", handleLoginFormSubmit);