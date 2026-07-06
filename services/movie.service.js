const Movie = require('../models/movie.model')

const createMovie = async(data) =>{
    try{
        const movie = await Movie.create(data);
        return movie;
    }catch(error){
        if(error.name == 'ValidationError'){
            let err  = {};
            Object.keys(error.errors).forEach((key) =>{
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return {err: err, code: 422};
        }
        else{
            throw error;
        }
    }
    
}

const deleteMovie = async(id) =>{
    const response = await Movie.findByIdAndDelete(id);
    return response;
}

const getMovieById = async (id)=>{
    const movie = await Movie.findById(id);
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
    createMovie,
    getMovieById,
    deleteMovie,
}