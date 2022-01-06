const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('ludy-token');

    if (!token) {
        return res.status(401).json({
            msg: "There is no token in the request header"
        })
    }

    try {
        
        const { username } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.userAuth = username;

        next();
        
    } catch (err) {
        console.log("Token not valid")
        console.log("Token sent: " + token);
        return res.status(401).json({
            msg:"Token not valid"
        })
    }

}


module.exports = {
    validateJWT
}