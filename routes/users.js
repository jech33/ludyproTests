const { Router } = require('express');
const { check } = require('express-validator');
const { usersByCompanyGet, createUser } = require('../controllers/company.js');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validateJWT } = require('../middlewares/validate-jwt.js');

// Init router
const router = Router();

// Routes 
router.get('/', [validateJWT], usersByCompanyGet)

router.post('/', [
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({ min:6 }),
    validarCampos], createUser)

module.exports = router;