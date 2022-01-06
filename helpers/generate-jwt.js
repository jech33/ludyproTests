const jwt = require('jsonwebtoken');

const generateJWT = (username = "") => {

    return new Promise((resolve, reject) => {

        const payload = { username }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "2h"
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No es posible generar el token')
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}