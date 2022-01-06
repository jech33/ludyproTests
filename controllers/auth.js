const { request, response } = require('express');
const { connection } = require('../db/dboracle');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req = request, res = response) => {

    const {username} = req.headers;
    const dbusername = connection.username;

    if (!username) {
        return res.status(401).json({
            msg:"Debe ingresar para poder acceder"
        })
    }

    if (username !== dbusername) {
        return res.status(401).json({
            msg:"Usuario inválido, no se permite acceso"
        })
    }

    const token = await generateJWT(username);

    res.json({username, dbusername, token});
}

const loginRequest = async (req = request, res = response) => {
    res.status(400).send("Did you mean POST?")
}

module.exports = {
    login,
    loginRequest
}