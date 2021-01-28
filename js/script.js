"use strict";

document.addEventListener("DOMContentLoaded", () => {
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
        promoGenre = promo.querySelector(".promo__genre"),
        promoBg = promo.querySelector(".promo__bg"),
        movieList = document.querySelector('.promo__interactive-list'),
        addingInput = document.querySelector(".adding__input"),
        button = document.querySelector("button"),
        deleteElm = document.querySelector(".delete"),
        chekBoxInput = document.querySelector("input[type=checkbox]");

    promoAdv.forEach(item => {
        item.remove();
    });


    promoGenre.innerText = "драма";
    promoBg.style.backgroundImage = " url('img/bg.jpg ') ";

    const sortArr = (arr) => {
        arr.sort();
    };

    button.addEventListener("click", (event) => {
        event.preventDefault();

        if (addingInput.value != "" && addingInput.value != " ") {
            if (addingInput.value.length > 21) {
                addingInput.value = addingInput.value.substr(0, 21) + "...";
            }

            if (chekBoxInput) {
                console.log("Добавляем любимый фильм - ", addingInput.value);
            }

            movieDB.movies.push(addingInput.value);
            createMovieList(movieDB.movies, movieList);
            // movieList.innerHTML += `
            // <li class="promo__interactive-item">${movieDB.movies.length}. ${addingInput.value}
            // <div class="delete"></div>
            // </li>
            // `;
            addingInput.value = "";
        }
    });

    // movieList.innerHTML = "";
    // sortArr(movieDB.movies);
    // movieDB.movies.forEach((film, i) => {
    //     movieList.innerHTML += `
    //     <li class="promo__interactive-item">${i + 1}. ${film}
    //     <div class="delete"></div>
    //     </li>
    //     `;
    // });

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }
    createMovieList(movieDB.movies, movieList);
});