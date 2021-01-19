let numberOfFilms = prompt("Сколько фильмов вы посмотрели?");
let numberOfMovies = prompt("Последний фильм который вы смотрели?");
let numberOfBalls = prompt("На сколько оцените?");

let personalMovieDB = {
    count: numberOfFilms,
    movies: {
        numberOfMovies,
        numberOfBalls
    },
    actors: {},
    genres: [],
    privat: false
};

console.log(personalMovieDB.movies);