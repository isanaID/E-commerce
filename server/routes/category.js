const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const { policies_check } = require('../middlewares/index');

const categoryController = require('../controllers/category');

router.get('/category', categoryController.index);
router.post('/category', upload.none(), policies_check('create', 'Category'), categoryController.store);
router.put('/category/:id', upload.none(),  policies_check('update', 'Category'), categoryController.update);
router.delete('/category/:id', policies_check('delete', 'Category'), categoryController.destroy);

module.exports = router;