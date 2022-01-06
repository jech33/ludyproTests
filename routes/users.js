const { Router } = require('express');
const { usersByCompanyGet } = require('../controllers/company.js');
const { validateJWT } = require('../middlewares/validate-jwt.js');

// Init router
const router = Router();

// Routes 
router.get('/', [validateJWT], usersByCompanyGet)

module.exports = router;