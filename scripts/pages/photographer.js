//recuperation de l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = params.get("id"); // 

async function getPhotographers() {
    //importation des données du json
    const response = await fetch("./data/photographers.json");
    const photographers = await response.json();
    return photographers;  
}

// création des infos du photographe
async function displayData(photographers, name) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerInfos = document.querySelector(".photograph-infos");
    const photographerPhoto = document.querySelector(".photograph-photo");
    const priceSection = document.querySelector(".priceDay");
    const h2Modal = document.querySelector("h2");
    photographers.forEach((photographer) => {
        if(photographer.id == id){
            const photographerModel = photographerFactory(photographer);
            const photographerPriceDay = photographerModel.getPriceDay();
            const photoProfil = photographerModel.picture;
            const infoProfil = photographerModel.getUserInfo();
            const img = document.createElement( "img" );
            img.setAttribute("src", photoProfil, "alt",);
            photographerPhoto.appendChild(img);
            photographerInfos.appendChild(infoProfil);
            name = photographer.name;
            priceSection.appendChild(photographerPriceDay);
            h2Modal.textContent = "Contactez-moi " + name;
        }
    });
};

// création de la gallerie du photographe
async function displayGallerie(photographers, media){
    let name = "";
    // récupération du nom du photographe
    photographers.forEach((photographer) =>{
        if(photographer.id == id){
            name = photographer.name;
            return name;
        }
    });
    // integration du retour de la factory
    function getPhotographerMedia(){
        const gallerieSection = document.querySelector(".photograph-gallerie");
        media.forEach((newMedia) => {
            if (newMedia.photographerId == id){
                const photographerMedia = mediaFactory(newMedia, name);
                const mediaGallerie = photographerMedia.getMediaGallerie();
                gallerieSection.appendChild(mediaGallerie); 
            }    
        });
    }
    getPhotographerMedia();
}


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    displayData(photographers);
    displayGallerie(photographers, media);
};

init(); 
