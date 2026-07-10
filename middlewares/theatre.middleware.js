const {errorResponseBody, successResponseBody} = require("../utils/responsebody")

const validateTheatreCreateRequest = async(req, res, next) =>{
    // Validate name
    if(!req.body.name){
        errorResponseBody.message = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // validate pincode
    if(!req.body.pincode){
        errorResponseBody.message = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // validate city
    if(!req.body.city){
        errorResponseBody.message = "The city of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

const validateUpdateMoviesRequest = async(req, res, next) =>{
    // Validating insert
    if(req.body.insert == undefined){
        errorResponseBody.message = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validating movieIds
    if(!req.body.movieIds){
        errorResponseBody.message = "No movies present in the request to update";
        return res.status(400).json(errorResponseBody);
    }

    if(!(req.body.movieIds instanceof Array)){
        errorResponseBody.err = "Expected array of movies but found something else"
        return res.status(400).json(errorResponseBody);
    }

    if(req.body.movieIds.length == 0){
        errorResponseBody.err = "Np movie is present in the array provided"
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest,
}