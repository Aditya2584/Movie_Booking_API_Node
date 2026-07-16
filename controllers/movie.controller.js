const Movie = require("../models/movie.model")
const movieService = require("../services/movie.service")
const {successResponseBody, errorResponseBody} = require("../utils/responsebody")
const {STATUS} = require("../utils/constants")


const createMovie = async(req, res) =>{
    try{
        const response = await movieService.createMovie(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the movie"
        return res.status(STATUS.OK).json(successResponseBody);

    }catch(err){
        // console.log(err.errors.description);
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const deleteMovie = async (req, res) => {
    try {
        const response = await movieService.deleteMovie(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the movie";

        return res.status(STATUS.OK).json(successResponseBody);

    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        console.log(err);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

const getMovie = async (req, res) =>{
    try{
        const response = await movieService.getMovieById(req.params.id);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);

        return res.status(STATUS.OK).json({
            success: true,
            error: {},
            message: "Successfully fetched the movie details",
            data: movie
        });
    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        console.log(err);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMovie = async(req, res) =>{
    try{
        const response = await movieService.updateMovie(req.params.id, req.body);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            errorResponseBody.message = "The Updates that we are trying to apply doesn't validate the schema";
            return res.status(error.code).json(errorResponseBody);
        }
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
} 

const getMovies = async(req, res) =>{
    try{
        const response = await movieService.fetchMovies(req.query);
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);        
        }
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies,
}