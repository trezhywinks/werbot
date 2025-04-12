const figlet = require('figlet');
const banner = "Botsapp";
const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState } = require('@whiskeysockets/baileys');
const QRCode = require('qrcode-terminal');

const prefix = "."; 

function ban(){
figlet.text(banner, (err, data) => {
if (err){
console.log('[!] Erro => ', err);
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
            console.log('Bot conectado!');
        }
    });

     whmer.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const sender = msg.key.remoteJid;

        //   view
        await whmer.readMessages([msg.key]);
       console.log(msg);
        //  cases
        if (text.startsWith(prefix)) {
            const command = text.slice(1).trim().split(" ")[0];
            switch (command) {
                case "fingmais":
                    await whmer.sendMessage(sender, { text: "Pong!" });
                    break;

                default:
                   // await whmer.sendMessage(sender, { text: "Comando não reconhecido." });
            }
        }
    });

    // view status 
    async function sendStatus(sock, sender) {
        const status = await sock.fetchStatus(sender);
        await sock.sendMessage(sender, { text: `Status atual: ${status.status || "Nenhum status disponível"}` });
    }
}
ban();
startBot();
