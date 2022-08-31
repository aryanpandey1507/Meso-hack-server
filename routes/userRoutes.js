const express = require('express');

const router = express.Router();

const {registerUser , loginUser , logoutUser , getUser , getUsers} = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logoutUser);
router.route('/users').get(getUsers);
router.route('/user/:id').get(getUser);


module.exports = router