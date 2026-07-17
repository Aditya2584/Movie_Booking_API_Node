const { STATUS, USER_ROLE, BOOKING_STATUS } = require("../utils/constants")
const { errorResponseBody, successResponseBody } = require("../utils/responsebody")
const ObjectId = require("mongoose").Types.ObjectId;

const theatreServices = require("../services/theatre.service");
const userService = require("../services/user.service")

const validateBookingCreateRequest = async(req, res, next) => {
    // theatre
    if(!req.body.theatreId){
        errorResponseBody.err = "No theatreId provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.err = "Invalid TheatreId Provided"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    const theatre = await theatreServices.getTheatre(req.body.theatreId);
    console.log(theatre);
    if(!theatre){
        errorResponseBody.err = "No theatre found for the given Id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    // movie
    if(!req.body.movieId){
        errorResponseBody.err = "No movieId provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.err = "Invalid movieId Provided"
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    console.log(theatre.movies.indexOf(req.body.movieId));
    if(theatre.movies.indexOf(req.body.movieId) == -1){
        errorResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    // Timing
    if(!req.body.timing){
        errorResponseBody.err = "No movie timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    // No of seats
    if(!req.body.noOfSeats){
        errorResponseBody.err = "No Seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    next();
}

const canChangeStatus = async(req, res, next) =>{
    const user = await userService.getUserById(req.user);
    if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled){
        errorResponseBody.err = "You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateBookingCreateRequest,
    canChangeStatus,
}