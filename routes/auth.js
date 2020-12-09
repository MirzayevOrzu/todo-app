const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const auth = require('../controllers/auth');
const { loginWithPassport } = require('../utils/middleware');

router.route('/register')
    .get(auth.renderRegisterForm)
    .post(catchAsync(auth.registerInLogic));

router.route('/login')
    .get(auth.renderLoginForm)
    .post(loginWithPassport, catchAsync(auth.loginLogic));

router.get('/logout', auth.logout)

module.exports = router;


