function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/photographersIDPhotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const a = document.createElement ("a")
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const pVille = document.createElement("p");
        const pTagline = document.createElement("p");
        const pPrice = document.createElement("p");
        a.setAttribute("id", name);
        a.href=`./photographer.html?id=${id}`
        a.classList.add("photographer");
        img.setAttribute("src", picture, "alt", )
        h2.textContent = name;
        pVille.classList.add("pVille")
        pVille.textContent = `${city}, ${country}`;
        pTagline.classList.add("pTagline")
        pTagline.textContent = tagline;
        pPrice.classList.add("pPrice")
        pPrice.textContent = `${price}€/jour`;
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(pVille);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }

    function getUserInfo() {
        const article = document.createElement("article");
        const h1 = document.createElement("h1");
        const pVille = document.createElement("p");
        const pTagline = document.createElement("p");
        h1.textContent = name;
        pVille.classList.add("pVille")
        pVille.textContent = `${city}, ${country}`;
        pTagline.classList.add("pTagline")
        pTagline.textContent = tagline;
        article.appendChild(h1);
        article.appendChild(pVille);
        article.appendChild(pTagline);
        return (article);
    }
    return { name, picture, getUserCardDOM, getUserInfo }
}

 function mediaFactory(data, name){
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const picture = "assets/photographers/"+name+"/"+image;
    const movie = "assets/photographers/"+name+"/"+video;

    function getMediaGallerie(){
        const article = document.createElement("article");
        if(image != undefined)
        {
            const img = document.createElement("img");
            img.setAttribute("src", picture.replace(/ /g, "_"), "alt",title)
            article.appendChild(img);
        }
        else{
            const video = document.createElement("video");
            video.setAttribute("src", movie.replace(/ /g, "_"), "alt",title)
            article.appendChild(video);
        }
        return (article);
    }
    return {picture, getMediaGallerie}
 }