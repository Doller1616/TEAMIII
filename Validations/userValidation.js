const { check } = require("express-validator");
const signupModel = require('../Models/signupModel');
const { decodeJWT } = require("../Utilities/JWTconfig");

exports.signupCheck = () => ([
    check('name').exists().withMessage("name can't be empty"),
    check('pwd').exists().withMessage("pwd can't be empty"),
    check('email').normalizeEmail().custom((async (email, { req }) => {
        const user = await signupModel.findOne({email});
        if(user == null) {
           return true
        } else {
           throw Error('User already exist')
        }
    })) 
]);

exports.signupVerifyCheck = () => ([
   check('id').custom(async (id, { req }) => {
        if(id) {
            req.authToken = id;
             return true
        } else {
            throw Error('token expired')
        }
   }), 
])

exports.loginCheck = () => ([
    check('pwd').exists(),
    check('email').normalizeEmail().custom(((email, { req }) => {
        
        // TODO: check Email in DB
        if(email === 'a@a.com') {
           req.userInfo = {
            id: 123,
            user: 'Name'
           }
           return true
        } else {
            return false
        }
    })) 
]);