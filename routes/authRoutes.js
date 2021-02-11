const {Router} = require('express');
const authController = require('../controllers/authController');
const router = Router();

//Our first get request would be to render the signup page from our views
router.get('/signup',authController.signup_get);

//post request to send the user info to our db after the use fills the form from the get request
router.post('/signup',authController.signup_post);

//get request to render the login form apge from our views
router.get('/login', authController.login_get);

//post request to send the user info to the db to allow access to the application
router.post('/login', authController.login_post);

//get request to logout a user
router.get('/logout', authController.logout_get);

module.exports = router;