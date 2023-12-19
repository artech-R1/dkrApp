
const controller    = require('../controllers/usersController.js');
const express = require('express');
const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.deleteUser);



module.exports = router;



