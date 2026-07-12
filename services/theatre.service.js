const Theatre = require("../models/theatre.model")

const createTheatre = async(data) =>{
    try{
        const response = await Theatre.create(data);
        return response;
    }catch(error){
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) =>{
                err[key] = error.errors[key].message;
            });
            return {err: err, code :422};
        }
        console.log(error);
        throw error;
    }
}

const deleteTheatre = async (id) =>{
    try{
        const response = await Theatre.findByIdAndDelete(id);
        if(!response){
            return {
                err: "No record found for the given id",
                code: 404,
            }
        }
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

const getTheatre = async (id)=>{
    try{
        const response = await Theatre.findById(id);
        if(!response){
            return {
                err: "No theatre found for the given id",
                code: 404,
            }
        }
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
    
}

const getAllTheatres = async (data) =>{

    // try{
    //     let query = {};

    //     if(data && data.city){
    //         query.city = data.city;
    //     }
    //     const response = await Theatre.find({});
    //     return response;
    // }catch(error){
    //     console.log(error);
    //     throw error;
    // }

    try{
        let query = {};
        let pagination = {};
        if(data && data.city){
            query.city = data.city;
        }
        if(data && data.pincode){
            query.pincode = data.pincode;
        }
        if(data && data.name){
            // this checks whether name is present in query or not
            query.name = data.name
        }
        if(data && data.limit){
            pagination.limit = data.limit;
        }
        if(data && data.skip){
            let perPage = (data.limit) ? data.limit:3;
            pagination.skip = data.skip * perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }

}

const updateMoviesInTheatres = async(theatreId, movieIds, insert) => {

    try{
        if(insert){
            // let previousMovies = new Set(theatre.movies);
            // movieIds.forEach(movieId => {
            //     if(!previousMovies.has(movieId)){
            //         theatre.movies.push(movieId);
            //     }
            // });

            await Theatre.updateOne(
                {_id: theatreId},
                {$addToSet: {movies: {$each: movieIds}}}
            );
        }
        else{
            // let savedMovieIds = theatre.movies;
            // movieIds.forEach(movieId => {
            //     savedMovieIds = savedMovieIds.filter(smi => smi != movieId);
            // });
            // theatre.movies = savedMovieIds;

            await Theatre.updateOne(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}}
            );
        }
        const theatre = await Theatre.findById(theatreId);
        // await theatre.save();
        return theatre.populate("movies");
    }catch(error){
        if(error.name == 'TypeError'){
            return {
                code: 404,
                err: "No theatre found for the given Id"
            }
        }
        console.log(error);
        throw error;
    }
    // const theatre = await Theatre.findById(theatreId);
    // if(!theatre){
    //     return{
    //         err: "No such theatre found for the id provider",
    //         code: 404
    //     }
    // }
    

    
}

const updateTheatre = async(id, data) =>{
    try{
        const response = await Theatre.findByIdAndUpdate(id, data, {new: true, runValidators:true});
        if(!response){
            return {
                err: "No theatre found for the given id",
                code: 404,
            }
        }
        return response;
    }catch(error){
        if(error.name == "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach((key)=>{
                err[key] = error.errors[key].message;
            });
            return {err: err, code: 422}
        }
        throw error;
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres,
    updateTheatre,
}