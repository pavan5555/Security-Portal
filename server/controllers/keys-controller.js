const crypto = require('crypto');
const {performance} = require('perf_hooks');
exports.createKeyPair = (req, res, next) => {
  var perf_start = performance.now();
    crypto.generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: 'pavan'
        }
      }, (err, publicKey, privateKey) => {
        if(!err){
          var perf_end = performance.now();
          res.json({
            'public': publicKey,
            'private': privateKey,
            'key_perf':perf_end - perf_start

          });
        }      
      });


};