const figlet = require('figlet');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const banner = "werbot";
const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState } = require('@whiskeysockets/baileys');
const QRCode = require('qrcode-terminal');
const colors = require('colors');
const prefix = "_"; 
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
//        if (!msg.message || msg.key.fromMe) return;
        if (!msg.message) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const sender = msg.key.remoteJid || !isOwner;
        const isOwner = sender !==  '5522999982291@s.whatsapp.net'; 
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

           //     default:
                   // await whmer.sendMessage(sender, { text: "Comando não reconhecido." });
            //    case "winksmains":
              //  if (serverUy){
               //whmer.sendMessage(sender, {text: `My server\n${serverUy}/server`})
//} else {
//whmer.sendMessage(sender, {text: "Erro"})
//}            
//break; 

// case generate

case 'sef':
//if (!isBot && !isDono) return enviar(\n ❌ *APENAS MEU DONO*\n)
{
await whmer.relayMessage(sender,
  {viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
  "interactiveMessage": {
    "header": {
      "title":"ok"
    },
    "body": {
      "text": "null"
    },
    "nativeFlowMessage": {"buttons": [{
                "name": "open_webview",
                "buttonParamsJson": "{\"link\":{\"in_app_webview\":true,\"url\":\"https://google.com\",\"success_url\":\"https://www.example.com/success\",\"cancel_url\":\"https://www.example.com/cancel\"}}"
              },],
       "messageParamsJson": ""
       }
    }
  }
}},{})
}
break

case 'user_5': {
          await whmer.relayMessage(sender, {
            viewOnceMessage: {
              message: {
          "imageMessage": {
            "url": "https://mmg.whatsapp.net/v/t62.7118-24/19968773_1002193828203573_5732874433619071251_n.enc?ccb=11-4&oh=01_Q5Aa1QEqMTrLqFZpYDhTLy_rcv1A3h-y8pdzop4mh9SdA2HNVA&oe=6823CFEA&_nc_sid=5e03e0&mms3=true",                                                                                                                                                                                                   
            "mimetype": "image/jpeg",
            "caption": "Null",
            "fileSha256": "T2T7wYjSRsvJZgPeW79IgA9DELUiYK3rgg7gi2NxsJk=",
            "fileLength": "72530",
            "height": 736,
            "width": 736,
            "mediaKey": "PTvrxtx0Maemj5mBuYFQ7q4QFffph916mkH5B0dcswA=",
            "fileEncSha256": "22cV70NB9P1ZeXhPsYkviwsEKVOJh4iw0rJ+W24AdFo=",
            "directPath": "/v/t62.7118-24/19968773_1002193828203573_5732874433619071251_n.enc?ccb=11-4&oh=01_Q5Aa1QEqMTrLqFZpYDhTLy_rcv1A3h-y8pdzop4mh9SdA2HNVA&oe=6823CFEA&_nc_sid=5e03e0&_nc_hot=1744597607",                                                                                                                                                                                                           
            "mediaKeyTimestamp": "1744597607",
            "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCABIAEgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAQCAwUBBv/EABgBAAMBAQAAAAAAAAAAAAAAAAABAgME/9oADAMBAAIQAxAAAADI1                                                        KvVaHk50phqSzNhbVwui06IgqW1CudVLYyL15dS6xvlPcVIqGW2KScaqDTMd2XpW8qcqEw5YFwtkdVfYQp2iK3bEW2JMcXrn6KlxS8HPqvcDatYKOMBcAGx/8QAHBEAAgMAAwEAAAAAAAAAAAAAAAECESEQIjFx/9oACAECAQE/AJPS28PvF                                                        kqILpaJLppFYOiRGTiOTfovBo9LE0xCLwXEXtcf/8QAHxEAAgICAgMBAAAAAAAAAAAAAQIAERIhAxAxMkFR/9oACAEDAQE/AJhYu4ir8nI1kKelsmcgoj8nHdmo5triZMIgIOpVjUx+VQhGzEYIKMGjBR8SowxYnv18Qux7/8QAKxAAAgEDA                                                        wMDAwUBAAAAAAAAAQIDAAQREiExE0FRBSJhFDJCFSNScZGB/9oACAEBAAE/AI8FVRVyxPNS+nG2tQdJLtvkUlrJjUykCuKSKSX7dh5NdAIR1ULfNMkZGVOPg1YW4nlcvwO1fTCEFrdQrePNej2TTSiRhhQeTTlVhJwCFFX93PJcNrfCdgOKM                                                        pbdSdqhu5Y5Q5YnHY1b3kc4xkZq6UKmB+VWDCKfGdm2r1P1KW0uFRANOM/3QlfZQSqjgCra9dUaJ2JVhjftV6pGFP3Hv8VI2DpXYCo3OoA8GtTRSK6/9FLcCcKeQKMmlvbtU7rKoEya8cGi/UbUaC5dR5NepxjMbKOVqWM6sio4znJ2AqGLW                                                        DkbAZNWoCwE/NDdhUoLSaB3rOnY0pAkQ+DUkazRdJjg8qalsmXZkOfIqKyZ2CqjZ8ntS2kcFs0ecsw3NYCx4HApOaTedcjFSODjek1SHKHPxVvMZE0upDDmkkkUbHI8GutIfA/qm3zmpBgEfNRoWIUcmrmFoUJOM42+K6v0wUlQ2rzUduiokyDSrj/K0MOGoRt/I1oI4c1l159wq79rnSMg71YqBH1Wq7nEjk/iKsIYL2ERy/eh2+aMSiAxgbAYFWd2sjNEx96nFXl5JFJoQY+TUXqLA/uLkeRUN1FM2lSc+KvFiUhnOB3xSyNIOkhwg71cqQRvlat5GjbUpwRR9XmZengZO2qpLUoguI5xqzuO9fXK0eJ49WO4qS8g/CM/7X6hIoxEAlNNmIO0heQncHtVpe9NiwXORgg1LLrGMV///gADAP/Z",                                                                                                  
            "contextInfo": {
              "isForwarded": true,
              "forwardedNewsletterMessageInfo": {
                "newsletterJid": "https://google.com",
                "serverMessageId": 117,
                "newsletterName": "wer winks",
                "contentType": "UPDATE"
              }
            },
            "firstScanSidecar": "tlY2JL9a2kG0iw==",
            "firstScanLength": 6307,
            "scansSidecar": "tlY2JL9a2kG0iz8ZSsxBu817lZTaJS5mt8o7kurh11s0GNFwaceJGA==",
            "scanLengths": [
              6307,
              31195,
              13072,
              21954
            ],
           "midQualityFileSha256": "WIyt1PbNQx4nLQGgQheBpSd4MmXbL4SE4NdM276Npb0="
          }
        }
           }
          }, {});
        }
        break;

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

case 'user_': {
        await whmer.relayMessage(sender, {
          viewOnceMessage: {
            message: { 
        "stickerMessage": {
          "url": "https://mmg.whatsapp.net/v/t62.15575-24/19158894_680677817752566_8582551217151883096_n.enc?ccb=11-4&oh=01_Q5Aa1QHD83FvFF_4PrACEwLTS4lxt-gKP4iWEW_WghSey4eEhQ&oe=6823D8F7&_nc_sid=5e03e0&mms3=true",                                                                                                                                                                                                     
          "fileSha256": "KFTlmIuVzcFn4dpAlIpuLSgtDku9NU1wnXT2wcc+g2o=",
          "fileEncSha256": "syeAnEY4caVfXsnDUSE9+CWyTgpdSv4lIfIgbdXx8t0=",
          "mediaKey": "TMzjLHqkvBhSvKxMTJ4Hmyr+6vebl2eC21rhbAXzQdk=",
          "mimetype": "image/webp",
          "directPath": "/v/t62.15575-24/19158894_680677817752566_8582551217151883096_n.enc?ccb=11-4&oh=01_Q5Aa1QHD83FvFF_4PrACEwLTS4lxt-gKP4iWEW_WghSey4eEhQ&oe=6823D8F7&_nc_sid=5e03e0",                                                                                                                                                                                                                                
          "fileLength": "63896",
          "mediaKeyTimestamp": "1744549647",
          "isAnimated": false,
          "stickerSentTs": "1744596480900",
          "isAvatar": false,
          "isAiSticker": false,
          "isLottie": false
        }
      }
          }
        }, {});
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
