const { request, response } = require("express");
const { parseJwt } = require("../helpers/parse-jwt");
const User = require("../models/user");


const isAdmin = async (req = request, res = response, next) => {

    const token = req.headers["ludy-token"];
    const { id } = parseJwt(token);
    const user = await User.findById(id);

    if ( !user ) {
        return res.status(500).json({
            msg: 'Rol trying to be verified without validating the token first'
        })
    }

    const { rol, email } = user;

    if ( rol !== 'ROL_ADMIN' ) {
        return res.status(401).json({
            msg: `${email} no tiene permisos de administrador`
        })
    }

    next();
}

module.exports = {
    isAdmin
}