const figlet = require('figlet');
const banner = "Botsapp";

function cons(){
console.log("  [-] New Message.");
}

function ban(){
figlet.text(banner, (err, data) => {
if (err){
console.log('[!] Erro => ', err);
return;
}
console.log(data);
cons()
})
}

ban()
