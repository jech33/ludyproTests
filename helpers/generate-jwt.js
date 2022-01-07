const CONFIG1 = require("../index.json");
const jwt = require('jsonwebtoken')

const generateJWT = (id = "") => {

    return new Promise((resolve, reject) => {

        const payload = { id }

        jwt.sign(payload, CONFIG1.jwt.SECRETORPRIVATEKEY, {
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