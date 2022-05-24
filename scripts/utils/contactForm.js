const liTri = document.querySelectorAll(".tri li");
const emTri = document.querySelector(".arrowMenu em");
const formInput = document.querySelectorAll("form input")
function displayModal() {
    const media = document.querySelectorAll(".photograph-gallerie article");
    const modal = document.getElementById("contact_modal");
    const backgroundModal = document.querySelector(".modal");
    let name = document.querySelector(".photograph-infos h1").innerHTML
    let errorFirst = document.querySelector('.errorFirst');
    let errorLast = document.querySelector('.errorLast');
    let errorEmail = document.querySelector('.errorEmail');
    const first = document.forms["contact"]["first"];
    const last = document.forms["contact"]["last"];
    const  email = document.forms["contact"]["email"];
    const message = document.forms["contact"]["message"];
    //reset des champs inputs
    first.value="";
    last.value="";
    email.value="";
    message.value="";
    //reset des champs errors
    errorFirst.innerHTML="";
    errorLast.innerHTML="";
    errorEmail.innerHTML="";
    //adapte l'ordre des tabindex
    liTri.forEach((newLiTri)=>{
        newLiTri.removeAttribute("tabindex")
    })
    media.forEach((newMedia) =>{
        newMedia.firstChild.removeAttribute("tabindex")
    })
    formInput.forEach((newFormInput)=>{
        newFormInput.setAttribute("tabindex", "0")

    })
    emTri.removeAttribute("tabindex")
    modal.style.display = "block";
    modal.setAttribute("aria-labelledBy",`Contactme_${name.replace(/ /g, "_")}`)
	backgroundModal.style.backgroundColor = "#DB8876";

    function keyDown(e){
        const keyCode = e.code
        if(keyCode === "Escape"){
            closeModal()
        }
    }
    document.addEventListener("keydown",keyDown)
}

function closeModal() {
    const media = document.querySelectorAll(".photograph-gallerie article");
    const modal = document.getElementById("contact_modal");
    const form = document.querySelector("form");
    const h2 = document.querySelector(".modal h2");
    const carrousel = document.querySelector(".carrousel");
    const closeLightbox = document.querySelector(".fa-xmark");
    //adapte l'ordre des tabindex
    liTri.forEach((newLiTri)=>{
        newLiTri.setAttribute("tabindex", "0")
    })
    media.forEach((newMedia) =>{
        newMedia.firstChild.setAttribute("tabindex","0")
    })
    formInput.forEach((newFormInput)=>{
        newFormInput.removeAttribute("tabindex")
    })
    emTri.setAttribute("tabindex", "0")
    modal.style.display = "none";
    modal.style.display = "none";
    closeLightbox.style.display = "none";
    form.style.display ="block";
    h2.style.display ="block";
    //détruit le carrousel
    const items = document.querySelector(".items")
    if(items){
        carrousel.remove()
    }
    //rajoute la fonction onclick sur la gallerie media
    const photographGallerie = document.querySelectorAll(".photograph-gallerie article")
    photographGallerie.forEach((newPhotographGallerie)=>{
        newPhotographGallerie.firstChild.setAttribute("onclick", "lightbox(this.id)");
    })
}

// Objet verification values des inputs
class RetourValue {
    constructor(first, last, email, message) {
      this.first = first;
      this.last = last;
      this.email = email;   
      this.message = message;   
    }
  }

function validate(event) {
    const first = document.forms["contact"]["first"];
    const last = document.forms["contact"]["last"];
    const  email = document.forms["contact"]["email"];
    const  message = document.forms["contact"]["message"];
    let errorFirst = document.querySelector('.errorFirst');
    let errorLast = document.querySelector('.errorLast');
    let errorEmail = document.querySelector('.errorEmail');
    let returnFalse = false;

    const regexMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    // création d'une instance de retourLog pour recuperer la valeur de chaque elements
    const retourLog = new RetourValue(
      first.value,
      last.value,
      email.value,
      message.value
    );
    // cancel la redirection au clic submit
    event.preventDefault();

    // verification que le champs prénom ai un minimum de 2 caractères
    if (first.value.length < 2){
        errorFirst.innerHTML="Veuillez entrer 2 caractères ou plus pour le champ du prénom";
        returnFalse = true;
    }
  
    // verification que le champs nom ai un minimum de 2 caractères
    if (last.value.length < 2){
        errorLast.innerHTML="Veuillez entrer 2 caractères ou plus pour le champ du nom";
        returnFalse = true;
    }
  
    // verification que le champs mails soit valide
    if(!email.value.match(regexMail)){
        errorEmail.innerHTML="Veuillez entrer une adresse mail valide";
        returnFalse = true;
    }

    if (returnFalse == true)
    {
        return false;
    }
    console.log(retourLog)
    closeModal();
    return true;
}