const figlet = require('figlet');
const yts = require('yt-search');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const banner = "werbot";
const makeWASocket = require('@whiskeysockets/baileys').default;
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const { WA_MESSAGE_TYPE, generateWAMessage } = require('@whiskeysockets/baileys');
//const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const { useMultiFileAuthState, downloadMediaMessage } = require('@whiskeysockets/baileys');
const QRCode = require('qrcode-terminal');
const colors = require('colors');
const prefix = "_"; 

const { serverUp, emitter } = require('./server.js');
let serverUy;

//const respondedUsers = new Set();
const respondedFile = path.join(__dirname, 'usernamesJid.json');
let respondedUsers = [];

 
if (!emitter) {
  console.error('❌ emitter veio undefined!');
  process.exit(1);
}
 
emitter.once('link-pronto', (link) => {
// console.log('✅ Link recebido:', link);
serverUy = link;
});

function waitForServerUy() {
  return new Promise((resolve) => {
    if (serverUy) return resolve(serverUy);
    emitter.once('link-pronto', (link) => {
      serverUy = link;
      resolve(link);
    });
  });
}


function ban(){
figlet.text(banner, {font: 'Small'}, (err, data) => {
if (err){
console.log('! Erro => '.red, err);
return;
}
console.log(data);
})
};


async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('sessao');

    const whmer = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    whmer.ev.on('creds.update', saveCreds);

    whmer.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            QRCode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('- Bot Werbot connected!'.green.bold);
        }
    });

     whmer.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
//var body = (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
// if(!msg.message || msg.key.fromMe) return;

        if (!msg.message) return;
        const linkserver = await waitForServerUy();
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const sender = msg.key.remoteJid;
        const jid = msg.key?.remoteJid || m.chat || sender;        
 //   view
        await handleMessage(whmer, msg);
        await whmer.readMessages([msg.key]);
       console.log(msg);

 // casd

try {
  if (fs.existsSync(respondedFile)) {
    respondedUsers = JSON.parse(fs.readFileSync(respondedFile, 'utf8'));
  }
} catch (err) {
  console.error('! Erro to loading usernames answered:'.red, err);
  respondedUsers = [];
}

function saveRespondedUser(jid) {
  if (!respondedUsers.includes(jid)) {
    respondedUsers.push(jid);
    fs.writeFileSync(respondedFile, JSON.stringify(respondedUsers, null, 2));
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//const audioBuffer = fs.readFileSync('./monde.mp3'); 

async function respondToUser(whmer, msg) {
 const jid = msg.key.remoteJid;
const usernameHelo = msg.pushName;
  const username = jid.split("@")[0];
const onion = fs.readFileSync('./img/67f09e72e9e238549038dbd9.png');

//const onionImageUrl = 'https://trezhy.onrender.com/imagens/67fa635dc35d6554cb66d5c4.png'; 
//  const onion = (await axios.get(onionImageUrl, { responseType: 'arraybuffer' })).data;
  

  const message = {
    text: `*Hello @${username} I'm Moky*.\n *dreq not at the moment*\n`,
    contextInfo: {
      mentionedJid: [jid],
      externalAdReply: {
        mediaType: 1,
        title: `Hello ${usernameHelo}`,
        body: "respond quickly.",
        thumbnail: onion,
        previewType: "IMAGE",
        sourceUrl: "",
      }
    }
  };

  const extraMessage = {
    text: "you have reached the limit, I can't reply to many messages.\n\n\ntype (.main) to see the free commands",
  };

  const reaction = {
    react: {
      text: '👋🏻',
      key: msg.key
    }
  };


  await whmer.sendMessage(jid, message, { quoted: msg });
  await sleep(3000);
 // await whmer.sendMessage(jid, extraMessage);
  await whmer.sendMessage(jid, reaction);

  saveRespondedUser(jid);
  console.log(`- Responded to user ${jid}`.green.bold);
}

async function handleMessage(whmer, msg) {
  const jid = msg.key.remoteJid;
  if (msg.key.fromMe || jid.includes('status')) return;

  if (jid.includes('g.us')) {
    console.log('- Received message from group, ignoring.'.magenta.bold);
    return;
  }

  if (respondedUsers.includes(jid)) {
    console.log(`- Responded to user ${jid}, ignoring message`.green.bold);
    return;
  }

  await respondToUser(whmer, msg);
}

module.exports = { handleMessage };

//casd
        //  cases
        if (text.startsWith(prefix)) {
            const command = text.slice(1).trim().split(" ")[0];
            switch (command) {
                case "fingmais":
                    await whmer.sendMessage(sender, { text: "Pong!" });
                    break;

           //     default:
// case generate

case 'play': {
  const textMsg = msg.message?.conversation
               || msg.message?.extendedTextMessage?.text
               || '';

  console.log('msg:', textMsg);

  const query = textMsg.trim().split(' ').slice(1).join(' ');

  console.log('query:', query);

  if (!query) {
    await whmer.sendMessage(sender, { text: 'You need to provide the name of the audio after the command.\nExemple: *_play name*' }, {quoted: msg});
    break;
  }
  await whmer.sendMessage(sender, { text: `Searching for: *${query}*` }, {quoted: msg});

  try {
    const search = await yts(query);
    const audio = search.videos[0];

    if (!audio) {
      await whmer.sendMessage(sender, { text: `Error in the search for ${qrery}` }, {quoted: msg});
      break;
    }

    const url = audio.url;
    const filename = `${audio.videoId}.mp3`;

    await whmer.sendMessage(sender, { text: `Downloading: \n*${audio.title}*\n\nTime: *${audio.timestamp}*` });

    exec(`yt-dlp -x --audio-format mp3 -o '${filename}' '${url}'`, async (err) => {
      if (err) {
        console.error(err);
        await whmer.sendMessage(sender, { text: 'Error ... ' },{quoted: msg});
        return;
      }

      try {
        await whmer.sendMessage(sender, {
          audio: fs.readFileSync(filename)
        }, {quoted: msg});
        fs.unlinkSync(filename); 
      } catch (e) {
        await whmer.sendMessage(sender, { text: 'Error to send audio.' }, {quoted: msg});
      }
    });
  } catch (error) {
    await whmer.sendMessage(sender, { text: 'Erro.' },{quoted: msg});
  }

  break;
}

case 'reel': {
  let text = '';

  if (msg.message?.conversation) {
    text = msg.message.conversation;
  } else if (msg.message?.extendedTextMessage?.text) {
    text = msg.message.extendedTextMessage.text;
  }

  const linky = text.trim().split(' ')[1];
  if (!linky || !linky.includes('instagram.com/reel')) {
    await whmer.sendMessage(sender, { text: '*Send a valid link to an Instagram reel.*' }, {quoted: msg});
    return;
  }

  const filename = `reel-${Date.now()}.mp4`;

  exec(`yt-dlp -f mp4 -o '${filename}' '${linky}'`, async (err) => {
    if (err) {
      console.error(err);
      await whmer.sendMessage(sender, { text: '❌ Error to Donwload Reel' }, {quoted: msg});
      return;
    }

    await whmer.sendMessage(sender, {
      video: { url: `./${filename}` },
      caption: '✅ Reel successfully downloaded!'
    });

    fs.unlinkSync(`./${filename}`);
  },{quoted: msg});

  break;
}


case 'vid': {
  const textMsg = msg.message?.conversation
               || msg.message?.extendedTextMessage?.text
               || '';

  console.log('msg:', textMsg);

  const query = textMsg.trim().split(' ').slice(1).join(' ');

  console.log('query:', query);

  if (!query) {
    await whmer.sendMessage(sender, { text: 'ou need to provide the name of the video after the command.\nExemple: *!yt nameo*' }, {quoted, msg});
    break;
  }

  //await whmer.sendMessage(sender, { text: `Searching for: *${query}*` }, {quoted, msg});

  try {
    const search = await yts(query);
    const video = search.videos[0];

    if (!video) {
      await whmer.sendMessage(sender, { text: 'Not even a video found.' }, {quated: msg});
      break;
    }

    const url = video.url;
    const filename = `${video.videoId}.mp4`;

    await whmer.sendMessage(sender, {text: ` Downloading: \n*${video.title}*\n\nDuração: *${video.timestamp}*\n` });

    exec(`yt-dlp -f mp4 -o '${filename}' '${url}'`, async (err) => {
      if (err) {
        console.error(err);
        await whmer.sendMessage(sender, { text: 'Error downloading the video' }, {quoted: msg});
        return;
      }

      try {
        await whmer.sendMessage(sender, {
          video: fs.readFileSync(filename),
          caption: `✅ Vídeo: *${video.title}*\n\n🔗 ${video.url}`
        });
        fs.unlinkSync(filename);
      } catch (e) {
        await whmer.sendMessage(sender, { text: 'Error to send vídeo.' }, {quoted: msg});
      }
    });
  } catch (error) {
    await whmer.sendMessage(sender, { text: 'Error' });
  }

  break;

}


case 'nubnub': {
  async function image(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: { url }
    }, {
      upload: whmer.waUploadToServer
    });
    return imageMessage;
  }
  let msg = generateWAMessageFromContent(m.chat, {
    interactiveMessage: {
      body: { text: "[-] Creator" },
      carouselMessage: {
        cards: [
          {
            header: await image('./img/67f09e72e9e238549038dbd9.png'),
            body: {
              text: "*About me*\n\nSee all the data, find out everything about me.\n> Click to learn more.🫧\n"
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "About me",
                    url: `${linkserver}/server`
                  })
                }
              ]
            }
          },
       // ]
      //}
{
            header: await image('./img/67f09e72e9e238549038dbd9.png'),
            body: {
              text: "*WhatsApp Trasmission*\n\nTrasmission, send a hello to everyone.\n> Click to learn more.🫧\n"
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "cta_url",
                  buttonParamsJson: JSON.stringify({
                    display_text: "WhatsApp Bot",
                    url: `https://wa.me/dreq?text=Hi%20Love`
                  })
                }
              ]
            }
          }
        ]
      },

      messageVersion: 1
    }
  }, {});

  await whmer.relayMessage(sender, msg.message, {
    messageId: msg.key.id
  });
  break;
}

case 'ghinj': {
  const q = msg.message?.extendedTextMessage?.contextInfo;
  if (!q?.quotedMessage) {
    await whmer.sendMessage(sender, { text: "❌ Erro, Try Again" }, { quoted: msg });
    return;
  }

  const midia = q.quotedMessage.imageMessage || q.quotedMessage.videoMessage ||q.quotedMessage.stickerMessage ;
  if (!midia) {
    await whmer.sendMessage(sender, { text: "❌ Erro" }, { quoted: msg });
    return;
  }

  const buffer = await downloadMediaMessage(
    { message: q.quotedMessage },
    "buffer",
    {},
    { reuploadRequest: whmer.updateMediaMessage }
  );

  const tratarMidia = require('./connection/con.js');
  await tratarMidia(buffer, midia.mimetype, whmer, msg, sender);
  tratarMidia.midiaCapturada = buffer;
  break;
}


case 'winksg': {
  const quoted = msg.message?.extendedTextMessage?.contextInfo;

  if (!quoted?.quotedMessage) {
//    await whmer.sendMessage(sender, { text: "❌ Erro" }, { quoted: msg });
    return;
  }

  const quotedMsg = quoted.quotedMessage;
  const quotedType = Object.keys(quotedMsg)[0];
  const participant = quoted.participant || msg.participant || msg.key.participant;
  const userId = participant.replace(/@s\.whatsapp\.net/, "");
  const casename = `user_${userId}`;


  const content = JSON.stringify(quotedMsg, null, 2);

  // new case
  const generatedCase = `
case '${casename}': {
  await whmer.relayMessage(jid, {
    viewOnceMessage: {
      message: ${content}
    }
  }, {});
}
break;`;

  await whmer.sendMessage(sender, {
    text: `\n\n\`\`\`js\n${generatedCase}\n\`\`\``
  }, { quoted: msg });
}
break;


//generate
}


        }
   })
    // view status 
    async function sendStatus(sock, sender) {
        const status = await sock.fetchStatus(sender);
        await sock.sendMessage(sender, { text: `ok: ${status.status || "not"}` });
    }
}

//ban();
startBot();
