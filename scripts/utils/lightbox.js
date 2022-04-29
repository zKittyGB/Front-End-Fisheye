async function lightbox(clicked_id){
    const{media} = await getPhotographers();
    const id = params.get("id"); // 
    const modal = document.querySelector(".modal");
    const form = document.querySelector("form");
    const h2 = document.querySelector(".modal h2");
    form.style.visibility ="hidden";
    h2.style.visibility ="hidden";
    displayModal();
    const ul = document.createElement("ul");
    modal.appendChild(ul);
    media.forEach((newMedia) => {
        //récuperation de la liste de toutes les sources medias
        if (newMedia.photographerId == id){
            let  {src} = document.getElementById(`${newMedia.id}`);
            const li = document.createElement("li");
            li.textContent = src;
            ul.appendChild(li);
            ul.setAttribute("id","mediaList");
            //fonction d'apparition de l'image dans la modale
            function printImg(){
                if (clicked_id == newMedia.id){
                    modal.style.backgroundImage =`url(${src})`;
                    modal.style.backgroundSize ="cover";
                };
            }    
            printImg();
        };
    })
}




