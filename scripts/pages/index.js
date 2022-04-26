    async function getPhotographers() {
        //importation des données du json
        const response = await fetch('./data/photographers.json');
        const photographers = await response.json();
        return photographers;      
    }
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
        

    };

    // fonction de lien vers profil du photographe
    async function sendPhotographerPage(){   
        const { photographers } = await getPhotographers();
        const photographerLink = document.querySelectorAll(".photographer");
        let photographerID ="";
        //Récupérer les id de chaque photographe au clic
        function getID(){
            for (let i = 0; i < photographerLink.length; i++){
                photographerLink[i].addEventListener("click", function(){
                    photographerID = this.id.replace(/ /g, "_");
                    return photographerID;
                })
            }
        }
        //fonction d'envoie vers la page
        function sendPage(){
            for (let i = 0; i < photographerLink.length; i++){
                photographerLink[i].addEventListener("click", function(){
                    document.location.href=`./photographer.html?id=${photographerID}`;
                    console.log(photographerID);
                })
            }
        }
        getID();
        sendPage();
    }

    init(); 
    sendPhotographerPage();
