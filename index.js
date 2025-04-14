const figlet = require('figlet');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const banner = "Botsapp";
const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState } = require('@whiskeysockets/baileys');
const QRCode = require('qrcode-terminal');
const colors = require('colors');
const prefix = "."; 
const { serverUp, emitter } = require('./server.js');
let serverUy = null;

if (!emitter) {
  console.error('❌ emitter veio undefined!');
  process.exit(1);
}

emitter.on('link-pronto', (link) => {
// console.log('✅ Link recebido:', link);
serverUy = link;
});

serverUp();
//const respondedUsers = new Set();
const respondedFile = path.join(__dirname, 'usernamesJid.json');
let respondedUsers = [];

function ban(){
figlet.text(banner, (err, data) => {
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
        if (!msg.message || msg.key.fromMe) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const sender = msg.key.remoteJid;
        
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
    text: `*Hello @${username} I'm Winks*.\n *dreq not at the moment*\n`,
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

                default:
                   // await whmer.sendMessage(sender, { text: "Comando não reconhecido." });
                case "winksmains":
                if (serverUy){
               whmer.sendMessage(sender, {text: `My server\n${serverUy}/server`})
} else {
whmer.sendMessage(sender, {text: "Erro"})
}            
break; 
}


        }
   })
    // view status 
    async function sendStatus(sock, sender) {
        const status = await sock.fetchStatus(sender);
        await sock.sendMessage(sender, { text: `ok: ${status.status || "not"}` });
    }
}

ban();
startBot();
