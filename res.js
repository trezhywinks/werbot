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
