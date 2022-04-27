//recuperation de l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = params.get("id"); // la chaine de caractère "Jonathan Smith".


async function getPhotographers() {
    //importation des données du json
    const response = await fetch("./data/photographers.json");
    const photographers = await response.json();
    return photographers;  
}

async function displayData(photographers, name) {
    const photographerSection = document.querySelector(".photograph-header");
    const photographerInfos = document.querySelector(".photograph-infos");
    const photographerPhoto = document.querySelector(".photograph-photo");
    photographers.forEach((photographer) => {
        if(photographer.id == id){
            const photographerModel = photographerFactory(photographer);
            const photoProfil = photographerModel.picture;
            const infoProfil = photographerModel.getUserInfo();
            const img = document.createElement( "img" );
            img.setAttribute("src", photoProfil, "alt",);
            photographerPhoto.appendChild(img);
            photographerInfos.appendChild(infoProfil);
            name = photographer.name;
            return name;
        }
    });
};

async function displayGallerie(photographers, media){
    let name = "";
    // récupération du nom du photographe
    photographers.forEach((photographer) =>{
        if(photographer.id == id){
            name = photographer.name;
            return name;
        }
    });

    function getPhotographerMedia(){
        let photographerMedia = [];
        media.forEach((newMedia) => {
            if (newMedia.photographerId == id){
                photographerMedia.push(newMedia);
            }    
        });
        const photographerGallerie = mediaFactory(photographerMedia, name);
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
