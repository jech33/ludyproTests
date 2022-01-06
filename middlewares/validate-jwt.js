const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('ludy-token');

    if (!token) {
        return res.status(401).json({
            msg: "No ha especificado token en la petición"
        })
    }

    try {
        
        const { username } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.userAuth = username;

        next();
        
    } catch (err) {
        console.log(token);
        return res.status(401).json({
            msg:"Token no válido"
        })
    }

}


module.exports = {
    validateJWT
}