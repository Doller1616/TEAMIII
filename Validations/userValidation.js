const { check } = require("express-validator");
const signupModel = require('../Models/signupModel');
const Constants= require("../Utilities/Constants");
const { VERIFY_USER } = Constants;

exports.forSignup = () => ([
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

exports.forVerifyUser = () => ([
   check(VERIFY_USER).custom(async (token, { req }) => {
        if(token) {
            req.authToken = token;
             return true
        } else {
            throw Error('token expired')
        }
   }), 
])

exports.forLogin = () => ([
    check('email', 'Email is Required').isEmail().custom((email, {req}) => {
        return signupModel.findOne({email}).then(user => {
        if (user) {
            req.user = user;
            return true;
        } else {
            throw  new Error('User Does Not Exist');
        }
    });
}), check('pwd', 'Password is Required').isAlphanumeric()]);