const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
const { connection } = require('../db/dboracle');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');


const login = async (req = request, res = response) => {

    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(401).json({
            msg: "Username and password fields cannot be empty"
        })
    }

    try {

        // Verify if email exists
        const user = await User.findOne({ email: username });
        console.log(user)
        if (!user) {
            return res.status(400).json({
                msg: "User doesn't exist"
            })
        }

        // Verify if user is active in the database
        if (!user.status) {
            return res.status(400).json({
                msg: "User is not active, contact your database administrator"
            })
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Incorrect password"
            })
        }

        // Generate token
        const token = await generateJWT(user.id);

        res.json({
            msg: "Login ok",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Dev problem, there's a bug"
        })

    }

}

const loginRequest = async (req = request, res = response) => {
    res.status(400).send("Did you mean POST?")
}

module.exports = {
    login,
    loginRequest
}