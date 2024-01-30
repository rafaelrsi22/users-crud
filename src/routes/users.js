const express = require('express');

const userController = require('../controllers/usersController');
const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.delete('/', userController.deleteUser);
router.put('/', userController.updateUser)

module.exports = router;