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
    promoInteractiveItem = promo.querySelectorAll(".promo__interactive-item");

promoAdv.forEach(item => {
    item.remove();
});
// promoAdv.remove();

promoGenre.innerText = "драма";

promoBg.style.backgroundImage = " url('img/bg.jpg ') ";

movieDB.movies.sort();

for (let i = 0; i < promoInteractiveItem.length; i++){
    promoInteractiveItem[i].innerText = `${i + 1} ` + movieDB.movies[i];
}
