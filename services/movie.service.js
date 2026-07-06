const Movie = require('../models/movie.model')

const getMovieById = async (id)=>{
    const movie = Movie.findById(id);
    console.log("movie found : ", movie);
    if(!movie){
        return {
            err: "no movie found for the corresponding id provider",
            code : 404, 
            // message: "Something went wrong, unable to fetch the movie",
            // data: {},
        }
    };
    return movie;
}

module.exports = {
    getMovieById,
}