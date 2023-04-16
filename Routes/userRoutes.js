const Express = require('express');
const { userLoginController } = require('../Controllers/UserController');
const userValid = require('../Validations/userValidation');
const ValidatorResult = require('../Middlewares/ValidatorResult');
const Routes = Express.Router();


function initilizer() {
    getRequestHandler();
    postRequestHandler();
}

initilizer();

function getRequestHandler ( ){

}

function postRequestHandler ( ){

    Routes.post('/login', userValid.loginCheck(), ValidatorResult, userLoginController);

}







module.exports = Routes;