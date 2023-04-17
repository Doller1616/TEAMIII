const Express = require('express');
const { userLogin, userSignup, userVerify } = require('../Controllers/UserController');
const userValid = require('../Validations/userValidation');
const ValidatorResult = require('../Middlewares/ValidatorResult');
const Routes = Express.Router();


function initilizer() {
    getRequestHandler();
    postRequestHandler();
}

initilizer();

function getRequestHandler ( ){
    Routes.get('/verify', userValid.signupVerifyCheck(), ValidatorResult, userVerify);
}

function postRequestHandler ( ){
    Routes.post('/login', userValid.loginCheck(), ValidatorResult, userLogin);
    Routes.post('/signup', userValid.signupCheck(), ValidatorResult, userSignup);
}

module.exports = Routes;