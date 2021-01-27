"use strict";

const movieDB = {
    movies: [
        "Логан1WADWAWDA",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


const promo = document.querySelector(".promo"),
    promoAdv = promo.querySelectorAll(".promo__adv img"),
    // promoAdv = promo.querySelector(".promo__adv"),
    promoGenre = promo.querySelector(".promo__genre"),
    promoBg = promo.querySelector(".promo__bg"),
    // promoInteractiveItem = promo.querySelectorAll(".promo__interactive-item"),
    movieList = document.querySelector('.promo__interactive-list');

// promoAdv.remove();
promoAdv.forEach(item => {
    item.remove();
});

promoGenre.innerText = "драма";

promoBg.style.backgroundImage = " url('img/bg.jpg ') ";

movieDB.movies.sort();


movieList.innerHTML = "";
movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
    <li class="promo__interactive-item">${i + 1} ${film}
    <div class="delete"></div>
    </li>
    `;
});
// for (let i = 0; i < promoInteractiveItem.length; i++){
//     promoInteractiveItem[i].innerHTML = `${i + 1} ` + movieDB.movies[i];
// }