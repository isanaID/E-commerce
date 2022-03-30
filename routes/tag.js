const router = require('express').Router();
const multer = require('multer');
const upload = multer();

const tagController = require('../controllers/tag');

router.get('/tag', tagController.index);
router.post('/tag', upload.none(), tagController.store);
router.put('/tag/:id', upload.none(), tagController.update);
router.delete('/tag/:id', tagController.destroy);

module.exports = router;