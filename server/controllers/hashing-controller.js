const crypto = require('crypto');
const {performance} = require('perf_hooks');

exports.createHash = (req, res, next) => {
    var perf_start = performance.now();
    var incmg_dat = req.body.data;
    if(incmg_dat !== ""){
        var gen_hash = crypto.createHash('md5').update(incmg_dat).digest('hex');
        var perf_end = performance.now();
        res.json({
            'hash': gen_hash,
            'hash_perf' : perf_end - perf_start
        });
    }
};