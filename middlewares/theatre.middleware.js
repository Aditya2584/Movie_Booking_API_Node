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

module.exports = {
    validateTheatreCreateRequest
}