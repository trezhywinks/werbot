const fs = require('fs');
const path = require('path');
//const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const midiaCapturada = null; 
module.exports = { midiaCapturada }

module.exports = async ( buffer, mimetype, whmer, msg, sender) => {
  await whmer.sendMessage(sender, {
    [mimetype.startsWith("image/") ? "image" : "video"]: buffer,
    mimetype,
    caption: "> Received"
  }, { quoted: msg });
};


console.log(midiaCapturada);

//const url = 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif'

(async () => {
  const buffer = 
  if (!buffer) return console.log('Erro null');

  try {
    const caminhoWebp = await baixarEConverterParaWebp(buffer, 'werbot');
    console.log('=> :', caminhoWebp);
  } catch (err) {
    console.error('Erro:', err);
  }
})();


async function baixarEConverterParaWebp(buffer, nomeBase = 'werbot') {
  const pastaTemp = './temp';
  if (!fs.existsSync(pastaTemp)) {
    fs.mkdirSync(pastaTemp);
  }

  const caminhoOriginal = path.join(pastaTemp, `${nomeBase}.original`);
  const caminhoWebp = path.join(pastaTemp, `${nomeBase}.webp`);

  fs.writeFileSync(caminhoOriginal, buffer);

  return new Promise((resolve, reject) => {
    ffmpeg(caminhoOriginal)
      .outputOptions([
        '-vcodec', 'libwebp',
        '-lossless', '1',
        '-qscale', '75',
        '-preset', 'default',
        '-loop', '0',
        '-an',
        '-vsync', '0'
      ])
      .toFormat('webp')
      .save(caminhoWebp)
      .on('end', () => {
        console.log(`Saved ${caminhoWebp}`);
        resolve(caminhoWebp);
      })
      .on('error', (err) => {
        console.error('Erro:', err);
        reject(err);
      });
  });
}

