const getApi = async () => {
    try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    return data;
    } catch (error) {
    console.log(error);
    }
};

const getCategoriesApi = async () => {
    try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    return data;
    } catch (error) {
    console.log("error");
    }
};

getApi().then((data) => {
    const allCategoriesButton = document.querySelector("#all-filter");
    allCategoriesButton.addEventListener("click", () => renderGallery(data));
    renderGallery(data);
});

getCategoriesApi().then((categories) => {
    const buttonsContainer = document.querySelector("#js-filter-box");

    categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category.name;
    button.classList.add("button-filter");

    button.addEventListener("click", async () => {
        const getData = await getApi();
        const filteredData = getData.filter(
        (data) => data.categoryId === category.id
        );
        renderGallery(filteredData);
    });

    buttonsContainer.appendChild(button);
    });
});
