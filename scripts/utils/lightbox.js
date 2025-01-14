async function lightbox(clicked_id){
    //var global
    const modal = document.querySelector(".modal");
    const form = document.querySelector("form");
    const{media} = await getPhotographers();
    const id = params.get("id"); 
    const close = document.querySelector(".close");
    const h2 = document.querySelector(".modal h2");
    //retire la fonction onclick sur la gallerie media
    const photographGallerie = document.querySelectorAll(".photograph-gallerie article")
    photographGallerie.forEach((newPhotographGallerie)=>{
        newPhotographGallerie.firstChild.removeAttribute("onclick");
    })
    //variable essentielle a la co nstruction du carrousel
    const divCarrousel = document.createElement("div");
    const divControlsLeft = document.createElement("div");
    const divControlsRight = document.createElement("div");
    const spanPrev = document.createElement("span");
    const  spanNext = document.createElement("span");
    const emPrev = document.createElement("em")
    const emNext = document.createElement("em")
    const closeLightbox = document.querySelector(".fa-xmark");
    closeLightbox.style.display = "block";
    //création du carrousel
    modal.insertBefore(divCarrousel, form);
    divCarrousel.appendChild(divControlsLeft);
    divCarrousel.appendChild(divControlsRight);
    divControlsLeft.appendChild(spanPrev);
    divControlsRight.appendChild(spanNext);
    spanPrev.appendChild(emPrev);
    spanNext.appendChild(emNext);
    divCarrousel.setAttribute("class", "carrousel")
    divCarrousel.setAttribute("aria-label", "image closeup view")
    divControlsLeft.setAttribute("role", "button")
    divControlsLeft.setAttribute("class", "controls controls-left")
    divControlsRight.setAttribute("role", "button")
    divControlsRight.setAttribute("class", "controls controls-right")
    spanPrev.setAttribute("class","img prev-image")
    spanNext.setAttribute("class","img next-image")
    emPrev.setAttribute("aria-hidden","true")
    emPrev.setAttribute("aria-label","Previous image")
    emPrev.setAttribute("class","fa fa-4x fa-angle-left")
    emNext.setAttribute("aria-hidden","true")
    emNext.setAttribute("aria-label","Next image")
    emNext.setAttribute("class","fa fa-4x fa-angle-right")

    //variables dependantes de la création du carrousel
    const carrousel = document.querySelector(".carrousel");
    const carrouselItem = document.createElement("div");
    const emLeft = document.querySelector('.fa-angle-left');
    const emRight = document.querySelector('.fa-angle-right');
    //cacher le formulaire de la modal
    close.style.visibility = "visible";
    close.setAttribute("aria-label","Close Dialog")
    form.style.display ="none";
    h2.style.display ="none";
    carrousel.style.display="inline-flex";
    displayModal();
    modal.style.backgroundColor ="#ffffff";
    emLeft.style.display = "block";
    emRight.style.display = "block";
    let item = 0;
    const popularite = document.querySelector("#popularite")
    const date = document.querySelector("#date")
    const titre = document.querySelector("#titre")
    let mediaSort ="";
    //réorganisation du carrousel en fonction du tri selectionné
    if(popularite.checked){
        mediaSort = media.sort(function compare(a,b){
            if (a.likes < b.likes){
                return -1;
            }
            if(a.likes > b.likes){
                return +1;
            }
            return 0;
        });
    }
    if(date.checked){
        mediaSort = media.sort(function compare(a,b){
            if (a.date < b.date){
                return -1;
            }
            if(a.date > b.date){
                return +1;
            }
            return 0;
        });
    }
    if(titre.checked){
        mediaSort = media.sort(function compare(a,b){
            if (a.title < b.title){
                return -1;
            }
            if(a.title > b.title){
                return +1;
            }
            return 0;
        });
    }
    else{
        mediaSort= media;
    }
    mediaSort.forEach((newMedia) => {
        //récuperation de la liste de toutes les sources medias
        if (newMedia.photographerId == id){
            let  {src} = document.getElementById(`${newMedia.id}`);
            const img = document.createElement("img");
            const video = document.createElement("video");
            const div = document.createElement("div");
            const p = document.createElement("p");
            const arrowRight = document.querySelector(".controls-right");
            carrouselItem.setAttribute("class","items")
            carrousel.insertBefore(carrouselItem, arrowRight)
            carrouselItem.appendChild(div);
            //gestion si image ou video
            if(newMedia.image != undefined)
            {
                div.appendChild(img);
                img.setAttribute("src",`${src}`);
                img.setAttribute("class",`${item}`);
                img.setAttribute("alt",`${newMedia.title}`);
            }
            else{
                div.appendChild(video);
                video.setAttribute("src",`${src}`);
                video.setAttribute("controls","")
                video.setAttribute("width","250")
                video.setAttribute("type","video/mp4")
                video.setAttribute("class",`${item}`);
                video.setAttribute("alt",`${newMedia.title}`);
            }
            div.setAttribute("class",`carrousel-item item-${item} photoId-${newMedia.id}`);
            div.appendChild(p);
            p.textContent = newMedia.title;
            p.setAttribute("class", "photo-title-lightbox")
            div.style.display="none";
            item +=1;  
        }
    })
    //var carrousel
    const photoClicked = document.querySelector(`.photoId-${clicked_id}`);
    const prevBtn = document.querySelector('.prev-image');
    const nextBtn = document.querySelector('.next-image');
    const carrouselItems = document.querySelectorAll('.carrousel-item');
    const photoClickedClassName = document.getElementById(`${clicked_id}`).className;
    let currentItemPosition = parseInt(photoClickedClassName);
    // affichage de l'image cliqué
    photoClicked.style.display="block";
    // gestion du switch de slide
    // slide suivante
    function goToNextSlide() {
        if (currentItemPosition + 1 >=  carrouselItems.length) {  
            const lastItem = `.item-${currentItemPosition}`;  
            currentItemPosition = 0;
            const currentItem = `.item-${currentItemPosition}`;
            setNodeAttributes(lastItem, currentItem);
        } else {
            currentItemPosition =  currentItemPosition+1;
            const lastItem = `.item-${currentItemPosition - 1}`;
            const currentItem = `.item-${currentItemPosition}`;
            setNodeAttributes(lastItem, currentItem);
        }
    }
    // slide précédente
    function goToPreviousSlide() {
        photoClicked.style.display="none";
        if (currentItemPosition - 1 >=  0) {
            currentItemPosition -= 1;
            const currentItem = `.item-${currentItemPosition}`;
            const lastItem = `.item-${currentItemPosition + 1}`;
    
            setNodeAttributes(lastItem, currentItem);
        } else {
            const lastItem = `.item-${currentItemPosition}`;
        
            currentItemPosition = carrouselItems.length -1;
            const currentItem = `.item-${currentItemPosition}`;
        
            setNodeAttributes(lastItem, currentItem);
        }
    }
    // gestion d'affichage de la slide
    function setNodeAttributes(lastItem, currentItem) {
        const lastImg = document.querySelector(`${lastItem}`);
        const currentImg = document.querySelector(`${currentItem}`);
        lastImg.style.display ="none";
        lastImg.setAttribute("aria-hidden","true");
        currentImg.style.display ="block";
        currentImg.setAttribute("aria-hidden","false");
    }

    function keyDown(e){
        const carrousel = document.querySelector(".carrousel");
        const keyCode = e.code
        if(carrousel){
            if(keyCode === "ArrowRight"){
                goToNextSlide()
            } 
            else if(keyCode === "ArrowLeft"){
                goToPreviousSlide()
            }
            else if(keyCode === "Escape"){
                closeModal()
            }
        }
    }
    //gestion du clavier dans le carrousel
    document.addEventListener("keydown",keyDown)

    close.addEventListener("clic", ()=>{   
        document.removeEventListener("keydown", keyDown);
    })
    document.addEventListener("keydown",(e)=>{
        if(e.code === "Escape"){
            document.removeEventListener("keydown", keyDown);  
        }
    })  
    // Events
    prevBtn.addEventListener("click",goToPreviousSlide);
    nextBtn.addEventListener("click",goToNextSlide);    

}





