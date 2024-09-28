const { Router } = require('express');
const controller = require('../controllers/commentController');
const { jwtAuth } = require('./middlewares/routeAuth');

const router = Router();

router.post('/comment', jwtAuth, controller.newComment);
router.get('/comment', jwtAuth, controller.getComment);
router.put('/comment', jwtAuth, controller.editComment);
router.delete('/comment', jwtAuth, controller.deleteComment);

module.exports = router;
