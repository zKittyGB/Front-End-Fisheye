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
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name} profil picture`);
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
        a.setAttribute("ariaLabel",`${name}`);
        a.autofocus = true
        article.appendChild(pVille);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }

    //factory pour photographer.html
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
    //retourne lr prix journallier du photographe
    function getPriceDay(){
        const photographerPriceDay = document.createElement("p");
        photographerPriceDay.textContent = `${price}€ / jour`
        return (photographerPriceDay);
    }
    return { name, picture, getUserCardDOM, getUserInfo, getPriceDay }
}
// factory création des medias
function mediaFactory(data, name, item){
    const { id, title, image, video, likes} = data;
    const picture = "assets/photographers/"+name.replace(/ /g, "_")+"/"+image;
    const movie = "assets/photographers/"+name.replace(/ /g, "_")+"/"+video;
    //gestion image ou video
    function getMediaGallerie(){
        const article = document.createElement("article");
        const divTitle = document.createElement("div");
        const pTitre = document.createElement("p");
        const divPrice = document.createElement("div");
        const nbrLike = document.createElement("p");
        const heart = document.createElement("i");
        nbrLike.setAttribute("class", "nbrLike");
        nbrLike.setAttribute("class", `${title.replace(/ /g, "_")}`);
        divTitle.setAttribute("class", "photoTitle");
        divPrice.setAttribute("class", "divPrice");
        heart.setAttribute("class", "fa-solid fa-heart");
        heart.setAttribute("aria-label", "likes");
        heart.setAttribute("id", `${title.replace(/ /g, "_")}`);
        heart.setAttribute("onclick", `addLike(this.id,${likes})`)

        if(image != undefined)
        { 
            const img = document.createElement("img");
            img.setAttribute("src", picture.replace(/ /g, "_"),)
            img.setAttribute("alt",title);
            img.setAttribute("onclick", "lightbox(this.id)")
            img.setAttribute("id",`${id}`);
            img.setAttribute("class",`${item}`);
            img.setAttribute("tabIndex","0")
            article.appendChild(img);
            article.setAttribute("class",`article-${item}`)
        }
        else{
            const video = document.createElement("video");
            video.setAttribute("controls","")
            video.setAttribute("width","250")
            video.setAttribute("type","video/mp4")
            video.setAttribute("src", movie.replace(/ /g, "_"))
            video.setAttribute("alt",title)
            video.setAttribute("onclick", "lightbox(this.id)")
            video.setAttribute("id",`${id}`);
            video.setAttribute("class",`${item}`);
            video.setAttribute("tabIndex","0")
            article.appendChild(video);
            article.setAttribute("class",`article-${item}`)
        }
        pTitre.textContent = title;
        nbrLike.textContent = likes;
        article.appendChild(divTitle);
        article.setAttribute("aria-label",`${title},closeup view`)
        divTitle.appendChild(pTitre);
        divTitle.appendChild(divPrice);
        divPrice.appendChild(nbrLike);
        divPrice.appendChild(heart);
        return (article);
    }
    return {getMediaGallerie}
 }