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
       
    //Récupérer les id de chaque photographe au clic
    async function getID(){
        const { photographers } = await getPhotographers();
        const photographerLink = document.querySelectorAll(".photographer");
        let photographerID = "";
        for (var i = 0; i < photographerLink.length; i++){
            photographerLink[i].addEventListener("click", function(){
                photographerID = this.id;
                console.log(photographerID)
                return photographerID;
            })
        }
    }

    init(); 
    getID();
