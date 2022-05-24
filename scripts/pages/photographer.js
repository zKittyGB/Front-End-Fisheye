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
function displayData(photographers, name) {
    const photographerInfos = document.querySelector(".photograph-infos");
    const photographerPhoto = document.querySelector(".photograph-photo");
    const priceSection = document.querySelector(".priceDay");
    const modal = document.querySelector(".modal header");
    const modalLastItem = document.querySelector(".modal header img");
    const h2Modal = document.createElement("h2");
    photographers.forEach((photographer) => {
        if(photographer.id == id){
            const photographerModel = photographerFactory(photographer);
            const photographerPriceDay = photographerModel.getPriceDay();
            const photoProfil = photographerModel.picture;
            const infoProfil = photographerModel.getUserInfo();
            const img = document.createElement( "img" );
            img.setAttribute("src", photoProfil);
            photographerPhoto.appendChild(img);
            photographerInfos.appendChild(infoProfil);
            name = photographer.name;
            img.setAttribute("alt", `${name}`);
            priceSection.appendChild(photographerPriceDay);
            photographerPriceDay.setAttribute("class","price")
            modal.insertBefore(h2Modal, modalLastItem)
            h2Modal.textContent = "Contactez-moi " + name.replace(/_/g, " ");
            h2Modal.setAttribute("id",`Contact_${name}`)
        }
    });
}

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
    const divTwoLastMesdia = document.createElement("div");
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
    // colle les dernier medias à gauche
    const lastImg = document.querySelector(`.article-${item}`) 
    const beforeLastImg = document.querySelector(`.article-${item-1}`)
    if(item >= 9){
        gallerieSection.appendChild(divTwoLastMesdia);
        divTwoLastMesdia.setAttribute("class","twoLastMedia")
        divTwoLastMesdia.appendChild(beforeLastImg)
        divTwoLastMesdia.appendChild(lastImg)
        if(item >= 10){
            const secondBeforeLastImg = document.querySelector(`.article-${item-2}`)
            divTwoLastMesdia.appendChild(secondBeforeLastImg)
            if(item >= 11){
                const thirdBeforeLastImg = document.querySelector(`.article-${item-3}`)
                divTwoLastMesdia.appendChild(thirdBeforeLastImg)
            }
        }
    }
}

// création de la gallerie du photographe
function displayGallerie(photographers, media){
        let name = "";
        let keyCode = "";

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
        const ulTri = document.querySelector(".tri ul")
        const borderTop = document.querySelector(".border-top")
        const borderBottom = document.querySelector(".border-bottom")
        const populariteLi = document.querySelector(".tri-popularite")
        const dateLi = document.querySelector(".tri-date")
        const titreLi = document.querySelector(".tri-titre")
        if(document.querySelector(".article-0 img")){
            firstImg = document.querySelector(".article-0 img")
        }
        else{
            firstImg = document.querySelector(".article-0 video")
        }
        //fonction organisation menu tri en fonction de popularite
        function populariteListener(){
            const gallerieSection = document.querySelector(".photograph-gallerie");
            //replacer le menu click en haute position
            ulTri.insertBefore(dateLi,ulTri.firstChild)
            ulTri.insertBefore(borderBottom,ulTri.firstChild)
            ulTri.insertBefore(titreLi,ulTri.firstChild)
            ulTri.insertBefore(borderTop,ulTri.firstChild)
            ulTri.insertBefore(populariteLi,ulTri.firstChild)

            radioPopularite.checked = true;
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
        }
        //ajout du listener clic après un focus dessus
        popularite.addEventListener("focus", ()=>{
            popularite.addEventListener("click",populariteListener)
        })
        //ajout du listener au clavier  
        document.addEventListener("keydown",(e)=>{
            keyCode =e.code    
            if(popularite === document.activeElement && keyCode === "Enter"){
                populariteListener()
            }
        })
        //fonction organisation menu tri en fonction de date
        function dateListener(){
            const gallerieSection = document.querySelector(".photograph-gallerie");
            //replacer le menu click en haute position
            ulTri.insertBefore(populariteLi,ulTri.firstChild)
            ulTri.insertBefore(borderBottom,ulTri.firstChild)
            ulTri.insertBefore(titreLi,ulTri.firstChild)
            ulTri.insertBefore(borderTop,ulTri.firstChild)
            ulTri.insertBefore(dateLi,ulTri.firstChild)
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
        }
        //ajout du listener clic après un focus dessus
        date.addEventListener("focus", ()=>{
            date.addEventListener("click",dateListener)                           
        })  
        //ajout du listener au clavier  
        document.addEventListener("keydown",(e)=>{
            keyCode =e.code    
            if(date === document.activeElement && keyCode === "Enter"){
                dateListener()
            }
        })
        //fonction organisation menu tri en fonction de titre
        function titreListener(){
            const gallerieSection = document.querySelector(".photograph-gallerie");
            //replacer le menu click en haute position
            ulTri.insertBefore(populariteLi,ulTri.firstChild)
            ulTri.insertBefore(borderBottom,ulTri.firstChild)
            ulTri.insertBefore(dateLi,ulTri.firstChild)
            ulTri.insertBefore(borderTop,ulTri.firstChild)
            ulTri.insertBefore(titreLi,ulTri.firstChild)
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
        }

        //ajout du listener clic après un focus dessus
        titre.addEventListener("focus", ()=>{
            titre.addEventListener("click",titreListener)                           
        })
        //ajout du listener au clavier  
        document.addEventListener("keydown",(e)=>{
            keyCode =e.code    
            if(titre === document.activeElement && keyCode === "Enter"){
                titreListener()
            }
       })
        firstImg.addEventListener("focus",()=>{
            const liste = document.querySelectorAll(".liste")
            //retrait des listener
            titre.removeEventListener("click", titreListener)
            date.removeEventListener("click", dateListener)
            popularite.removeEventListener("click", populariteListener)
            
            liste.forEach((newListe)=>{
                newListe.style.visibility ="hidden"
                ulTri.firstElementChild.style.visibility="visible"
            });
            borderBottom.style.visibility= "hidden"
            borderTop.style.visibility= "hidden"
            ulTri.style.backgroundColor= ""    
        })
    }

    //déclenchement "onclick" sur image via touche enter
    function pressEnterImg() {
        document.addEventListener("keydown",(e)=>{
            keyCode = e.code 
            if(keyCode === "Enter"){
                document.activeElement.click();     
            }            
       })
    }
    pressEnterImg();

    //afficher / cacher le menu trier par
    function triMenuShow(){
        const liste = document.querySelectorAll(".liste")
        const arrowMenu = document.querySelector(".fa-angle-up")
        const ulTri = document.querySelector(".tri ul")
        const borderTop = document.querySelector(".border-top")
        const borderBottom = document.querySelector(".border-bottom")
        //met à jour la reference d'ultri en cas de changement de type de tri        
            arrowMenu.addEventListener("focus", ()=>{
                liste.forEach((newListe)=>{
                    newListe.style.visibility ="visible";
                });
                borderBottom.style.visibility= "visible"
                borderTop.style.visibility= "visible"
                ulTri.style.backgroundColor= "#901c1c"
            });
            arrowMenu.addEventListener("mouseenter", ()=>{
                liste.forEach((newListe)=>{
                    newListe.style.visibility ="visible";
                });
                borderBottom.style.visibility= "visible"
                borderTop.style.visibility= "visible"
                ulTri.style.backgroundColor= "#901c1c"
            });

            ulTri.addEventListener("mouseleave", ()=>{
                liste.forEach((newListe)=>{
                    newListe.style.visibility ="hidden"
                    ulTri.firstElementChild.style.visibility="visible"
                });
                borderBottom.style.visibility= "hidden"
                borderTop.style.visibility= "hidden"
                ulTri.style.backgroundColor= ""
            });

            document.addEventListener("keydown",(e)=>{
                if(e.code === "Escape"){
                    liste.forEach((newListe)=>{
                        newListe.style.visibility ="hidden"
                        ulTri.firstElementChild.style.visibility="visible"
                    });
                    borderBottom.style.visibility= "hidden"
                    borderTop.style.visibility= "hidden"
                    ulTri.style.backgroundColor= ""
                }
            })
    }
    triMenuShow();
    tri();
}


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    displayData(photographers);
    displayGallerie(photographers, media);
}
init(); 
