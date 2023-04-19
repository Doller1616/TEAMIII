const Express = require('express');
const { userLogin, userSignup, userVerify } = require('../Controllers/userController');
const validChecks = require('../Validations/userValidation');
const { authenticate, validateResults } = require('../Middlewares/GlobalMiddleWare');
const Routes = Express.Router();


function initilizer() {
    getRequestHandler();
    postRequestHandler();
}

initilizer();

function getRequestHandler ( ){
    Routes.get('/verify', validChecks.forVerifyUser(), validateResults, authenticate, userVerify);
}

function postRequestHandler ( ){
    Routes.post('/login', validChecks.forLogin(), validateResults, userLogin);
    Routes.post('/signup', validChecks.forSignup(), validateResults, userSignup);
}

module.exports = Routes;