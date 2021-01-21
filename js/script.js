"use strict";

let responseArr = [];

function ShowQustionForUser(){
    responseArr[0] = +prompt("Сколько фильмов вы посмотрели?", "1");
    while (responseArr[0] == "" || responseArr[0] == null || isNaN(responseArr[0])) {
        responseArr[0] = +prompt("Сколько фильмов вы посмотрели?", "1");
    }
    responseArr[1] = prompt("Последний фильм который вы смотрели?", "Зомби в корее");
    while (responseArr[1] == "" || responseArr[1] == null) {
        responseArr[1] = prompt("Последний фильм который вы смотрели?", "Зомби в корее");
    }
    responseArr[2] = +prompt("На сколько оцените?", "6");
    while (responseArr[2] == "" || responseArr[2] == null || isNaN(responseArr[0])) { 
        responseArr[2] = +prompt("На сколько оцените?", "6");
    }
}

ShowQustionForUser();

let genresArr = [];
function writeYourGenres() {
    for (let i = 0; i < 3; i++){
        genresArr[i] = prompt(`Ваш любимый жанр под номером ${i+1}`, "nigga");
    }
}
writeYourGenres();
function showMyDB(arrayGenres) {
    let personalMovieDB = {
        count: parseInt(responseArr[0]),
        movies: {
            numberOfMovies: responseArr[1],
            numberOfBalls: responseArr[2]
        },
        actors: {},
        genres: [] = arrayGenres,
        privat: false
    };
    personalMovieDB.privat == true ? console.log("У пользователя приватный аккаунт") : console.log(personalMovieDB);
}

showMyDB(genresArr);