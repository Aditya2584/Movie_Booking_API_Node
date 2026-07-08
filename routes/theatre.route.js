const theatreController = require("../controllers/theatre.controller");
const theatreMiddlewares = require("../middlewares/theatre.middleware")

const routes = (app) =>{
    app.post('/mba/api/v1/theatres',theatreMiddlewares.validateTheatreCreateRequest , theatreController.create);

    app.get('/mba/api/v1/theatres/:id', theatreController.getTheatre);
}

module.exports = routes;