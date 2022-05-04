async function lightbox(clicked_id){
    const{media} = await getPhotographers();
    const id = params.get("id"); // 
    const carrousel = document.querySelector(".carrousel");
    const form = document.querySelector("form");
    const h2 = document.querySelector(".modal h2");
    const ul = document.createElement("ul");

    //cacher le formulaire de la modal
    form.style.display ="none";
    h2.style.display ="none";
    carrousel.style.display="inline";
    displayModal();
    carrousel.appendChild(ul);
    let item = 0;
    media.forEach((newMedia) => {
        //récuperation de la liste de toutes les sources medias
        if (newMedia.photographerId == id){
            let  {src} = document.getElementById(`${newMedia.id}`);
            const li = document.createElement("li");
            const img = document.createElement("img");
            ul.appendChild(li);
            li.appendChild(img);
            img.setAttribute("class",`carrousel-item item-${item} photoId-${newMedia.id}`);
            img.setAttribute("src",`${src}`);
            img.style.display="none";
            item +=1;
            
        };
        //const clickedImg = document.querySelector(`.${clicked_id}`);
        //clickedImg.style.display= "block";

    })
    const photoClicked = document.querySelector(`.photoId-${clicked_id}`);
    //var carrousel
    const prevBtn = document.querySelector('.prev-image');
    const nextBtn = document.querySelector('.next-image');
    const carrouselItems = document.querySelectorAll('.carrousel-item');
    let currentItemPosition = 0
    // affichage de l'image cliqué
    photoClicked.style.display="block";
    // gestion du switch de slide
    function goToNextSlide() {

        if (currentItemPosition + 1 >=  carrouselItems.length) {
        
            const lastItem = `.item-${currentItemPosition}`;
    
            currentItemPosition = 0;
            const currentItem = `.item-${currentItemPosition}`;
        
            setNodeAttributes(lastItem, currentItem);
        } else {
            currentItemPosition += 1;
            const lastItem = `.item-${currentItemPosition - 1}`;
            const currentItem = `.item-${currentItemPosition}`;
        
            setNodeAttributes(lastItem, currentItem);
        }
    }

    function goToPreviousSlide() {
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
        const CurrentImg = document.querySelector(`${currentItem}`);
        lastImg.style.display ="none";
        CurrentImg.style.display ="block";

    }
    

    // Events
    prevBtn.addEventListener("click",goToPreviousSlide);
    nextBtn.addEventListener("click",goToNextSlide);    
}




