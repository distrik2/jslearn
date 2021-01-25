"use strict";

let personalMovieDB = {
    count: 0,
    movies: [],
    actors: {},
    genres: [],
    privat: false,

    ShowQustionForUser: function () {
        personalMovieDB.count = +prompt("Сколько фильмов вы посмотрели?", "1");
        while (personalMovieDB.count == "" || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt("Сколько фильмов вы посмотрели?", "1");
        }

        personalMovieDB.movies[0] = prompt("Последний фильм который вы смотрели?", "Зомби в корее");
        while (personalMovieDB.movies[0] == "" || personalMovieDB.movies[0] == null || personalMovieDB.movies[0].length > 50) {
            personalMovieDB.movies[0] = prompt("Последний фильм который вы смотрели?", "Зомби в корее");
        }

        personalMovieDB.movies[1] = +prompt("На сколько оцените?", "6");
        while (personalMovieDB.movies[1] == "" || personalMovieDB.movies[1] == null || isNaN(personalMovieDB.movies[1])) {
            personalMovieDB.movies[1] = +prompt("На сколько оцените?", "6");
        }
    },

    writeYourGenres: function () {
        // for (let i = 0; i < 3; i++) {
        //     personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i + 1}`);
        //     if (personalMovieDB.genres[i] == "" || personalMovieDB.genres[i] == null || personalMovieDB.genres[i] == " "){
        //         i--;
        //     }
        // }

        let gen = prompt(`Введите ваши любимые жанры без запятых.`);
        personalMovieDB.genres = gen.split(" ");

        personalMovieDB.genres.forEach(function (item, i, genres) {
            console.log(`Любимый жанр #${i + 1} - это ${item}`);
        });

    },

    showMyDB: function(){
        personalMovieDB.privat == true ? console.log("У пользователя приватный аккаунт") : console.log(personalMovieDB);
    },

    toggleVisibleMyDB: function(){
        if (!personalMovieDB.privat) {personalMovieDB.privat = true;}
        else {personalMovieDB.privat = false;}
    },
};

personalMovieDB.ShowQustionForUser();
personalMovieDB.writeYourGenres();
personalMovieDB.toggleVisibleMyDB();
personalMovieDB.showMyDB();
// console.log(personalMovieDB);