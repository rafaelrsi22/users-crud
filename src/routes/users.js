const express = require('express');

const userController = require('../controllers/usersController');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/', userController.deleteUser);
router.put('/', userController.updateUser);

router.get('/profile/:userId', profileController.getProfile);
router.put('/profile/:userId', profileController.updateProfile);

module.exports = router;