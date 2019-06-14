const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.user_sign_up);

router.post('/login', UserController.user_log_in);

router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;