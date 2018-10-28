/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 

function getTheMinutes(duration) {

    if (typeof duration === "number") return duration

    if (duration.indexOf("h") === -1) {
        return parseInt(duration.slice(0, duration.indexOf("min")))
    } else if (duration.indexOf("min") === -1) {
        return parseInt(duration.slice(0, duration.indexOf("h"))) * 60
    } else {
        let minutes = parseInt(duration.slice(0, duration.indexOf("h"))) * 60 + parseInt(duration.slice(duration.indexOf(" "), duration.indexOf("min")))
        return minutes
    }
}

function turnHoursToMinutes(movieCollection) {
    return movieCollection.map(function (movie) {
        let movieCopy = {...movie};
        movieCopy.duration = getTheMinutes(movie.duration);
        return movieCopy;
    })
}

// Get the average of all rates with 2 decimals 

function ratesAverage(moviesCollection) {
    let rates = moviesCollection.map(function (movie) {
        return parseFloat(movie.rate)
    });
    let ratesSum = rates.reduce(function (ac, cu) {
        if (isNaN(cu)){
            return ac
            }
        return ac + cu
    });
    return Math.round(100 * ratesSum / rates.length, 2) / 100

}

// Get the average of Drama Movies

function dramaMoviesRate(moviesCollection) {
    let dramaMovies = moviesCollection.filter(function (movie) {
        return movie.genre.indexOf("Drama") !== -1
    });

    if (dramaMovies.length===0) return;

    return ratesAverage(dramaMovies)
}

// Order by time duration, in growing order

function orderByDuration(moviesCollection){
    internalMoviesCol = turnHoursToMinutes(moviesCollection);
    return internalMoviesCol.sort(function(a,b){
        if (a.duration > b.duration){
            return 1
        };
        if (a.duration < b.duration){
            return -1
        };
        if (a.duration === b.duration){
            if (a.title > b.title){
                return 1
            } else if (a.title < b.title) {
                return -1
            } else {
                return 0
            }
        }
        
    })
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(moviesCollection) {

    let dramaMovies = moviesCollection.filter(function (movie) {
        return movie.genre.indexOf("Drama") !== -1
    });

    if (dramaMovies.length===0) return;

    let spielbergDramaMovies = dramaMovies.filter( function(movie) {
        return movie.director==="Steven Spielberg"
    });

    return `Steven Spielberg directed ${spielbergDramaMovies.length} drama movies!`
}

// Order by title and print the first 20 titles

function orderAlphabetically(moviesCollection) {
    
    let movieTitles = moviesCollection.map( function(movie) {
        return movie.title;
    })

    let orderedMovieTitles = movieTitles.sort(function(a,b){
        if (a>b) return 1;
        if (a<b) return -1;
        return 0
    })

    return orderedMovieTitles.splice(0, 20);
}


// Best yearly rate average
