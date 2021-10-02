const express = require('express');
const upload = require('./utils/upload');
const api = require('./api');

const router = express.Router();

router.post('/upload', upload.single('image'), api.addImage);
router.get('/list', api.listImages);
router.get('/image/:id', api.downloadImage);
router.delete('/image/:id', api.deleteImage);
router.get('/merge', api.mergeImages);

module.exports = router;
