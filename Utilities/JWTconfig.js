const JWT = require('jsonwebtoken');
const SECRET = 'Babu-sona'

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

exports.decodeJWT = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, SECRET, (err, decoded ) => {
            if(err) {
                console.error('JWTconfig.decodeJWT', err);
                reject('Invalid token');
              } else {
                  resolve(decoded);
              }
        })
    });
}

