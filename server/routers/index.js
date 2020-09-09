const router = require('express').Router();

const Controller = require('../controllers/usercontroller');
const taskRouters = require('./taskrouter');
router.get('/', (req, res) => res.status(200).json({ msg : 'successfully connect to sy-kanban' }));

// user router : login, register
router.post('/register', Controller.register);
router.post('/login', Controller.login);

// task CRUD authorization
router.use('/tasks', taskRouters);

module.exports = router;