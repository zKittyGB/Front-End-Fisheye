async function lightbox(clicked_id){
    //var global
    const modal = document.querySelector(".modal");
    const form = document.querySelector("form");
    const{media} = await getPhotographers();
    const id = params.get("id"); 
    const close = document.querySelector(".close");
    const h2 = document.querySelector(".modal h2");

    //variable essentielle a la co nstruction du carrousel
    const divCarrousel = document.createElement("div");
    const divControlsLeft = document.createElement("div");
    const divControlsRight = document.createElement("div");
    const spanPrev = document.createElement("span");
    const  spanNext = document.createElement("span");
    const iPrev = document.createElement("i")
    const iNext = document.createElement("i")
    //création du carrousel
    modal.insertBefore(divCarrousel, form);
    divCarrousel.appendChild(divControlsLeft);
    divCarrousel.appendChild(divControlsRight);
    divControlsLeft.appendChild(spanPrev);
    divControlsRight.appendChild(spanNext);
    spanPrev.appendChild(iPrev);
    spanNext.appendChild(iNext);
    divCarrousel.setAttribute("class", "carrousel")
    divControlsLeft.setAttribute("role", "button")
    divControlsLeft.setAttribute("class", "controls controls-left")
    divControlsRight.setAttribute("role", "button")
    divControlsRight.setAttribute("class", "controls controls-right")
    spanPrev.setAttribute("class","img prev-image")
    spanNext.setAttribute("class","img next-image")
    iPrev.setAttribute("ariaHidden","true")
    iPrev.setAttribute("class","fa fa-4x fa-angle-left")
    iNext.setAttribute("ariaHidden","true")
    iNext.setAttribute("class","fa fa-4x fa-angle-right")

    //variables dependantes de la création du carrousel
    const carrousel = document.querySelector(".carrousel");
    const carrouselItem = document.createElement("div");
    const iLeft = document.querySelector('.fa-angle-left');
    const iRight = document.querySelector('.fa-angle-right');
    //cacher le formulaire de la modal
    close.style.visibility = "visible";
    form.style.display ="none";
    h2.style.display ="none";
    carrousel.style.display="inline-flex";
    displayModal();
    modal.style.backgroundColor ="#ffffff";
    iLeft.style.display = "block";
    iRight.style.display = "block";
    let item = 0;


    media.forEach((newMedia) => {
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
            }
            else{
                div.appendChild(video);
                video.setAttribute("src",`${src}`);
                video.setAttribute("class",`${item}`);
            }
            div.setAttribute("class",`carrousel-item item-${item} photoId-${newMedia.id}`);
            div.appendChild(p);
            p.textContent = newMedia.title;
            p.setAttribute("class", "photo-title-lightbox")
            div.style.display="none";
            item +=1;  
        };
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
            console.log(currentItemPosition) 
            const lastItem = `.item-${currentItemPosition}`;  
            currentItemPosition = 0;
            const currentItem = `.item-${currentItemPosition}`;
            console.log(currentItemPosition)
            setNodeAttributes(lastItem, currentItem);
        } else {
            currentItemPosition =  currentItemPosition+1;
            const lastItem = `.item-${currentItemPosition - 1}`;
            const currentItem = `.item-${currentItemPosition}`;
            setNodeAttributes(lastItem, currentItem);
            console.log(currentItemPosition)
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
            console.log(currentItem)
        }
    }
    // gestion d'affichage de la slide
    function setNodeAttributes(lastItem, currentItem) {
        const lastImg = document.querySelector(`${lastItem}`);
        const currentImg = document.querySelector(`${currentItem}`);
        lastImg.style.display ="none";
        currentImg.style.display ="block";
    }

    //vider les données de la liste du carroussel à la fermeture
    close.addEventListener("click", ()=>{
        const carrousel = document.querySelector(".carrousel");
        carrousel.remove();
      
        close.style.visibility = "hidden";
    });
    // Events
    prevBtn.addEventListener("click",goToPreviousSlide);
    nextBtn.addEventListener("click",goToNextSlide);    
    
}




