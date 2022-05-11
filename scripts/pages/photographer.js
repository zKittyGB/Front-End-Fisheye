//recuperation de l'id du photographe
let params = (new URL(document.location)).searchParams;
let id = params.get("id"); // 
let totalLike ="0";
async function getPhotographers() {
    //importation des données du json
    const response = await fetch("./data/photographers.json");
    const photographers = await response.json();
    return photographers;  
}

// création des infos du photographe
async function displayData(photographers, name) {
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
            photographerPriceDay.setAttribute("class","price")
            h2Modal.textContent = "Contactez-moi " + name;
        }
    });
};

 // integration du retour de la factory
 function getPhotographerMedia(media, name){
    const mainGallerie = document.querySelector(".main__photograph--gallerie")
    const gallerieSection = document.createElement("div");
    let item = -1;
    mainGallerie.appendChild(gallerieSection);
    gallerieSection.setAttribute("class","photograph-gallerie")
    media.forEach((newMedia) => {
        if (newMedia.photographerId == id){
            item += 1
            totalLike = parseInt(totalLike) + parseInt(newMedia.likes);
            const photographerMedia = mediaFactory(newMedia, name, item);
            const mediaGallerie = photographerMedia.getMediaGallerie();
            gallerieSection.appendChild(mediaGallerie); 
        }    
    });
    
    const priceSection = document.querySelector(".priceDay");
    const price = document.querySelector(".price");
    const p = document.createElement( "p" );
    const div = document.createElement( "div" );
    const heart = document.createElement( "i" );
    // bloque l'incrémentation de plusieurs "like totaux" au clic des boutons tris
    if(!document.querySelector('.like')){
    heart.setAttribute("class", "fa-solid fa-heart")
    // Ajout des likes totaux et du prix dans priceSection
    priceSection.insertBefore(div, price)
    div.setAttribute("class", "like")
    div.appendChild(p);
    div.appendChild(heart);
    p.textContent = `${totalLike}`;
    }
}

// création de la gallerie du photographe
async function displayGallerie(photographers, media){
        let name = "";
    // récupération du nom du photographe
    photographers.forEach((photographer) =>{
        if(photographer.id == id){
            name = photographer.name;
        }
    });
    getPhotographerMedia(media, name);
    function tri(){
        const popularite = document.querySelector(".tri-popularite")
        const date = document.querySelector(".tri-date")
        const titre = document.querySelector(".tri-titre")
        const radioPopularite = document.querySelector("#popularite")
        const radioDate = document.querySelector("#date")
        const radioTitre = document.querySelector("#titre")
        const like = document.querySelector(".like")
        const price = document.querySelector(".price")
        popularite.addEventListener("click", ()=>{
            const gallerieSection = document.querySelector(".photograph-gallerie");
            radioPopularite.checked ="true";
            if(gallerieSection){
                gallerieSection.remove();
            }
            const newMedia = media.sort(function compare(a,b){
                if (a.likes < b.likes){
                    return -1;
                }
                if(a.likes > b.likes){
                    return +1;
                }
                return 0;
            });
            getPhotographerMedia(newMedia, name)
        });
        date.addEventListener("click", ()=>{
            const gallerieSection = document.querySelector(".photograph-gallerie");
            radioDate.checked ="true";
            if(gallerieSection){
                gallerieSection.remove();
            }
            const newMedia = media.sort(function compare(a,b){
                if (a.date < b.date){
                    return -1;
                }
                if(a.date > b.date){
                    return +1;
                }
                return 0;
            });
            getPhotographerMedia(newMedia, name)
        });
        titre.addEventListener("click", ()=>{
            const gallerieSection = document.querySelector(".photograph-gallerie");
            radioTitre.checked ="true";
            if(gallerieSection){
                gallerieSection.remove();
            }
            const newMedia = media.sort(function compare(a,b){
                if (a.title < b.title){
                    return -1;
                }
                if(a.title > b.title){
                    return +1;
                }
                return 0;
            });
            getPhotographerMedia(newMedia, name)
        });
    }
   tri();
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    displayData(photographers);
    displayGallerie(photographers, media);
};

init(); 
