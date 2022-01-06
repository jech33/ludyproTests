const { Router } = require('express');
const { login, loginRequest } = require('../controllers/auth.js');
const { usersByCompanyGet } = require('../controllers/company.js');

// Init router
const router = Router();

// Routes 
router.post('/login', login)

router.all('/login', loginRequest)

module.exports = router;