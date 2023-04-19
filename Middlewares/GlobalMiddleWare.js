const JWT = require('jsonwebtoken');
const { validationResult } = require("express-validator");
const { JWT_SECRET } = require('../Utilities/Constants');

exports.validateResults = (req, res, next) => {
    const result = validationResult(req);
    const errorArr = result?.array()?.map((err)=> (err?.msg));
    if (!result.isEmpty()) {
      req.errorStatus = 401;
      next(errorArr);
    }
    next()
};

exports.authenticate = (req, res, next) => {
    const { authToken } = req || {};
        JWT.verify(authToken, JWT_SECRET, (err, decoded ) => {
            if(err) {
                req.errorStatus = 401;
                next(err);
              } else {
                req.authToken = decoded;
                next();
              }
        })
}

