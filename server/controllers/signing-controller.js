const crypto = require('crypto');
const formidable = require('formidable');
const fs = require('fs');
const {performance} = require('perf_hooks');

exports.createSign = (req, res, next) => {
    new formidable.IncomingForm().parse(req, (err, fields, files) => { 
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
                const package = fs.readFileSync(files.inpt_digsing_fl.path);
                const signer = crypto.createSign('sha256');
                signer.update(package);
                signer.end();
                const signature = signer.sign({'key': privateKey, 'passphrase' : 'pavan'});
                var perf_end = performance.now();
                res.json({
                    'dso_perf': perf_end-perf_start,
                    'dso_pub_key': publicKey,
                    'dso_pri_key': privateKey,
                    'dso_sig_fl_buf': 'data:'+files.type+';base64,'+package.toString('base64')
                });
            }        
      });
    })
};