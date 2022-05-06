async function lightbox(clicked_id){
    const{media} = await getPhotographers();
    const id = params.get("id"); // 
    const carrousel = document.querySelector(".carrousel");
    const form = document.querySelector("form");
    const h2 = document.querySelector(".modal h2");
    const modal = document.querySelector(".modal");
    const carrouselItem = document.createElement("div");
    const iLeft = document.querySelector('.fa-angle-left');
    const iRight = document.querySelector('.fa-angle-right');
    //cacher le formulaire de la modal
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
            const imgClicked = document.querySelector(`.photo-${item}`);
            const div = document.createElement("div");
            const p = document.createElement("p");
            const arrowRight = document.querySelector(".controls-right");
            carrouselItem.setAttribute("class","items")
            carrousel.insertBefore(carrouselItem, arrowRight)
            carrouselItem.appendChild(div);
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
    const photoClickedClassName = document.querySelector(`.photoId-${clicked_id} img`).className;
    const prevBtn = document.querySelector('.prev-image');
    const nextBtn = document.querySelector('.next-image');
    const carrouselItems = document.querySelectorAll('.carrousel-item');
    let currentItemPosition = parseInt(photoClickedClassName);
    // affichage de l'image cliqué
    photoClicked.style.display="block";
    // gestion du switch de slide
    function goToNextSlide() {
        if (currentItemPosition + 1 >=  carrouselItems.length) {  
            console.log(currentItemPosition) 
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
        currentImg.style.display ="block";
    }
      
    // Events
    prevBtn.addEventListener("click",goToPreviousSlide);
    nextBtn.addEventListener("click",goToNextSlide);    
    
}




