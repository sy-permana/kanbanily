const router = require('express').Router();

const Controller = require('../controllers/taskcontroller');

const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

// task CRUD and authorization for UD
router.use(authentication);
router.get('/', Controller.getAll);
router.post('/:category', Controller.create);
router.put('/:id', authorization, Controller.update);
router.patch('/:id/:category', authorization, Controller.updateCategory);
router.delete('/:id', authorization, Controller.delete);

module.exports = router;