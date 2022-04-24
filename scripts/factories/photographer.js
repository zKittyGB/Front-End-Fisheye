function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/photographersIDPhotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const pVille = document.createElement( 'p' );
        pVille.classList.add('pVille')
        pVille.textContent = `${city}, ${country}`;
        const pTagline = document.createElement( 'p' );
        pTagline.classList.add('pTagline')
        pTagline.textContent = tagline;
        const pPrice = document.createElement( 'p' );
        pPrice.classList.add('pPrice')
        pPrice.textContent = `${price}€/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pVille);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        article.classList.add("photographer");
        article.setAttribute("id", name.replace(/\s+/g, '_'));
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
