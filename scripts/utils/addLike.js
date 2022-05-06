// fonction de gestion des likes
async function addLike(clicked_id, likes){
    const like = document.querySelector(`.${clicked_id}`).textContent;
    const likeModify = document.querySelector(`.${clicked_id}`);
    const likeTotaux = document.querySelector(`.like p`).textContent;
    const likeTotauxModify = document.querySelector(`.like p`);
    let likeOrigin = parseInt(like);
    let likeTotauxOrigin= parseInt(likeTotaux);
    if(likes === likeOrigin){
        likeOrigin +=1;
        likeTotauxOrigin +=1;
        likeModify.textContent = likeOrigin;
        likeTotauxModify.textContent = likeTotauxOrigin;
    }
    else{
        likeOrigin -=1;
        likeModify.textContent = likeOrigin;
        likeTotauxOrigin -=1;
        likeTotauxModify.textContent = likeTotauxOrigin;
    }

}