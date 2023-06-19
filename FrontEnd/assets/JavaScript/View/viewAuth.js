export const updateLoginButton = (isLoggedIn, logoutAction) => {
    const $loginButton = document.querySelector("#js-login-button");
    if (isLoggedIn) {
        $loginButton.href = "#";
        $loginButton.innerText = "logout";
        $loginButton.addEventListener("click", () => {
            logoutAction();
            $loginButton.innerText = "Connexion";
        });
    }
};