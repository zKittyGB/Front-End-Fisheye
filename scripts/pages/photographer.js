//recuperation de l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = params.get("id").replace(/_/g, " ");; // la chaine de caractère "Jonathan Smith".

async function getPhotographers() {
    //importation des données du json
    const response = await fetch("./data/photographers.json");
    const photographers = await response.json();
    return photographers;      
}
async function displayData(photographers) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerInfos = document.querySelector(".photograph-infos");
    const photographerPhoto = document.querySelector(".photograph-photo");
    photographers.forEach((photographer) => {
        if(photographer.name === id){
            const photographerModel = photographerFactory(photographer);
            const photoProfil = photographerModel.picture;
            const infoProfil = photographerModel.getUserInfo();
            const img = document.createElement( "img" );
            img.setAttribute("src", photoProfil, "alt",);
            photographerPhoto.appendChild(img);
            photographerInfos.appendChild(infoProfil);
            console.log(infoProfil);
        }

    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};


init(); 
