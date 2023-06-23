export const token = localStorage.getItem("token");

export const isLogged = () => {
    const token2 = localStorage.getItem("token");
    if (token2 == null) { 
        return false;
    } else {
        return true;
    }
};

export const logOut = () => {
    console.log("appel de (logout)");
    console.log("comme je veux me déco,")
    localStorage.clear("token");
    window.location.reload();
};