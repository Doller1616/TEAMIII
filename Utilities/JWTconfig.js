const JWT = require('jsonwebtoken');
const SECRET = 'Oscars'

exports.createJWT = (userID, expire) => {
    return new Promise((resolve, reject) => {
        JWT.sign({userID}, SECRET, { expiresIn: expire }, (err, token) => {
            if(err) {
              console.error('JWTconfig.createJWT', err);
              reject('Token expired')
            } else {
                resolve(token);
            }
        })

    })
}

exports.decodeJWT = (req, res, next) => {
    const { authToken } = req || {};
        JWT.verify(authToken, SECRET, (err, decoded ) => {
            if(err) {
                next(err);
              } else {
                req.authToken = decoded;
                next();
              }
        })
}

