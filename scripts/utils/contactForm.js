function displayModal() {
    const modal = document.getElementById("contact_modal");
    const backgroundModal = document.querySelector(".modal");
	modal.style.display = "block";
	backgroundModal.style.backgroundColor = "#DB8876";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const form = document.querySelector("form");
    const h2 = document.querySelector(".modal h2");
    modal.style.display = "none";
    modal.style.display = "none";
    form.style.display ="block";
    h2.style.display ="block";
    const carrousel = document.querySelector(".carrousel");
    console.log(carrousel)
    if(carrousel){
        carrousel.remove();
    }
}
// Objet verification values des inputs
class RetourValue {
    constructor(first, last, email) {
      this.first = first;
      this.last = last;
      this.email = email;   
    }
  }

function validate(event) {
    let first = document.forms["contact"]["first"];
    let last = document.forms["contact"]["last"];
    let  email = document.forms["contact"]["email"];
    let errorFirst = document.querySelector('.errorFirst');
    let errorLast = document.querySelector('.errorLast');
    let errorEmail = document.querySelector('.errorEmail');
    let returnFalse = false;
    const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // création d'une instance de retourLog pour recuperer la valeur de chaque elements
    const retourLog = new RetourValue(
      first.value,
      last.value,
      email.value
    );
    // cancel la redirection au clic submit
    event.preventDefault();

    // Reset des champs error au clic submit
    errorFirst.innerHTML="";
    errorLast.innerHTML="";
    errorEmail.innerHTML="";

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
    console.log(retourLog);
    closeModal();
    return true;
}