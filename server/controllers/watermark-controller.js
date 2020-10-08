const Jimp = require('jimp');
const formidable = require('formidable');
const {performance} = require('perf_hooks');

exports.createWatermark = (req, res, next) => {
    var perf_start = performance.now();
    new formidable.IncomingForm().parse(req, (err,  Fields, Files) => {
        var sourcefile = Files.inpt_src_ig;
        waterMark(sourcefile.path, sourcefile.name).then(function(result){
            var perf_end = performance.now();
            res.json({
                'output' : result,
                'wtmrk_perf' : perf_end - perf_start
            });
            

        });
    })

};

async function waterMark(sourceImage, name) {
    let  watermark = await Jimp.read(`images/UTA_Mascot_sigA.gif`);
    watermark = watermark.resize(300,300);
    const image = await Jimp.read(sourceImage);
   watermark = await watermark
    image.composite(watermark, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 0.5
    })
    return image.getBase64Async(Jimp.AUTO);
  }