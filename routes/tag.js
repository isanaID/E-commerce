const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const { policies_check } = require('../middlewares/index');
const tagController = require('../controllers/tag');

router.get('/tag', tagController.index);
router.post('/tag', upload.none(),  policies_check('create', 'Tag'), tagController.store);
router.put('/tag/:id', upload.none(), policies_check('update', 'Tag'), tagController.update);
router.delete('/tag/:id', policies_check('delete', 'Tag'), tagController.destroy);

module.exports = router;