import { isLogged, logOut } from '../Model/modelAuth.js';
import { updateLoginButton } from '../View/viewAuth.js';

export const controlLoginButton = () => {
    console.log('appel controlelogout, on est in');
    window.addEventListener("load", () => {
        console.log('ceci est appelé au chargemennt de la page');
        console.log('valeur de isLogged :'+isLogged());
        updateLoginButton (isLogged(), logOut);
    });
};