const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const { v4: uuidv4 } = require('uuid');

ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = async (buffer, mimetype, whmer, msg, sender) => {
  try {
    const pastaTemp = './temp';
    if (!fs.existsSync(pastaTemp)) fs.mkdirSync(pastaTemp);

    const nomeArquivo = uuidv4();
    const caminhoOriginal = path.join(pastaTemp, `${nomeArquivo}`);
    const caminhoWebp = path.join(pastaTemp, `${nomeArquivo}.webp`);

    fs.writeFileSync(caminhoOriginal, buffer);

    await new Promise((resolve, reject) => {
      ffmpeg(caminhoOriginal)
        .outputOptions([
          '-vcodec', 'libwebp',
          '-vf', 'scale=512:512,pad=512:512',
          '-lossless', '1',
          '-qscale', '80',
          '-preset', 'default',
          '-loop', '0',
          '-an',
          '-vsync', '0'
        ])
        .toFormat('webp')
        .save(caminhoWebp)
        .on('end', resolve)
        .on('error', reject);
    });

    const bufferWebp = fs.readFileSync(caminhoWebp);

    await whmer.sendMessage(sender, {
      sticker: bufferWebp
    }, { quoted: msg });

    fs.unlinkSync(caminhoOriginal);
    fs.unlinkSync(caminhoWebp);

  } catch (err) {
    console.error('❌ Erro', err);
    await whmer.sendMessage(sender, {
      text: '❌ Erro'
    }, { quoted: msg });
  }
};
