const {STATUS} = require("../utils/constants")

const badRequestResponse = {
    success: false,
    err : "",
    data: {},
    message: "Malformed Request | Bad Request",
}

const validateMovieCreateRequest = async (req, res, next) =>{
    // Validating the movie name
    if(!req.body.name){
        badRequestResponse.err = "The name of the movie is not present in the request sent"
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // validating description
    if(!req.body.description){
        badRequestResponse.err = "The description of the movie is not present in the request sent"
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // Validating movie casts
    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
        badRequestResponse.err = "The cast of the movie is not present in the request sent"
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // Validating trailerURL
    if(!req.body.trailerUrl){
        badRequestResponse.err = "The Trailer URL of the movie is not present in the request sent"
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // Validating releaseDate
    if(!req.body.releaseDate){
        badRequestResponse.err = "The Release Date of the movie is not present in the request sent"
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    // Validating Director
    if(!req.body.director){
        badRequestResponse.err = "The director of the movie is not present in the request sent"
        return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
    }

    next();
}

module.exports = {
    validateMovieCreateRequest,
}