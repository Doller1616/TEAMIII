const { check } = require("express-validator");

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