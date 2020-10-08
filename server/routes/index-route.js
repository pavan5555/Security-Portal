const express = require('express');
const hashingController = require('../controllers/hashing-controller.js');
const keysController = require('../controllers/keys-controller.js');
const watermarkController = require('../controllers/watermark-controller');
const SigningController = require('../controllers/signing-controller');

const router = express.Router();

router.post('/generatehash',hashingController.createHash);
router.get('/createKeyPair', keysController.createKeyPair);
router.post('/createWatermark', watermarkController.createWatermark);
router.post('/createDigitalSignature', SigningController.createSign);
module.exports = router;


