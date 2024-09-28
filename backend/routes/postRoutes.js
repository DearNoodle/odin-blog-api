const { Router } = require('express');
const controller = require('../controllers/postController');
const { jwtAuth } = require('./middlewares/routeAuth');

const router = Router();

router.post('/post', jwtAuth, controller.newPost);
router.get('/post', jwtAuth, controller.getPost);
router.put('/post', jwtAuth, controller.editPost);
router.delete('/post', jwtAuth, controller.deletePost);

module.exports = router;
