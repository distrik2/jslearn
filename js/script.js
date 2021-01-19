"use strict";

let answersArray = ["Сколько фильмов вы посмотрели?",
                    "Последний фильм который вы смотрели?",
                    "На сколько оцените?"];
let responseArr = [];
let num = 0;
//я не мог нормально эту хуйню написать
while (answersArray.length > num) {
    if(prompt(answersArray[num]) !== ""){
        responseArr[num] = prompt(answersArray[num]);
        num++;
    }
}


let personalMovieDB = {
    count: parseInt(responseArr[0]),
    movies: {
        numberOfMovies: responseArr[1],
        numberOfBalls: responseArr[2]
    },
    actors: {},
    genres: [],
    privat: false
};


if(personalMovieDB.count < 10){
    console.log("Просмотрено довольно мало фильмов");
} 
else if(personalMovieDB.count >= 10 && personalMovieDB.count < 30){
    console.log("Вы классический зритель");
} 
else if(personalMovieDB.count >= 30){
    console.log("Вы киноман");
} 
else {
    console.log("Произошла ошибка");
}

console.log(personalMovieDB);