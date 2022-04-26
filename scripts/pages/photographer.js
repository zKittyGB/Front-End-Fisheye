//recuperation de l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = params.get('id').replace(/_/g, " ");; // la chaine de caractère "Jonathan Smith".
console.log(id);

async function getPhotographers() {
    //importation des données du json
    const response = await fetch('./data/photographers.json');
    const photographers = await response.json();
    return photographers;      
}
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    photographers.forEach((photographer) => {
        if(photographer.name === id){
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            console.log(photographers);
        }

    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};


init(); 
