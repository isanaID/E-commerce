const router = require('express').Router();
const multer = require('multer');
const upload = multer();

const categoryController = require('../controllers/category');

router.get('/category', categoryController.index);
router.post('/category', upload.none(), categoryController.store);
router.put('/category/:id', upload.none(), categoryController.update);
router.delete('/category/:id', categoryController.destroy);

module.exports = router;