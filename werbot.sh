#!/bin/bash

RED="$(printf '\033[31m')"  WHITE="$(printf '\033[37m')"
ORG="$(printf '\e[1;93m Werbot Ver : 1.0')"
REF="$(printf ' \e[1;37m\n')"

PWD=`command pwd`

printf " \e[1;37m Helo user\n"


##PLAY1="${WHITE}┌──(${RED}werscript${WHITE})-[~${PWD}]
##└─${RED}>${WHITE}"


banner(){
cat << EOF
Welcome to werbot.
${RED}

 █     █▓█████ ██▀███  ▄▄▄▄   ▒█████ ▄▄▄█████▓
▓█░ █ ░█▓█   ▀▓██ ▒ ██▓█████▄▒██▒  ██▓  ██▒ ▓▒
▒█░ █ ░█▒███  ▓██ ░▄█ ▒██▒ ▄█▒██░  ██▒ ▓██░ ▒░
░█░ █ ░█▒▓█  ▄▒██▀▀█▄ ▒██░█▀ ▒██   ██░ ▓██▓ ░ 
░░██▒██▓░▒████░██▓ ▒██░▓█  ▀█░ ████▓▒░ ▒██▒ ░ 
░ ▓░▒ ▒ ░░ ▒░ ░ ▒▓ ░▒▓░▒▓███▀░ ▒░▒░▒░  ▒ ░░   
  ▒ ░ ░  ░ ░  ░ ░▒ ░ ▒▒░▒   ░  ░ ▒ ▒░    ░    
  ░   ░    ░    ░░   ░ ░    ░░ ░ ░ ▒   ░      
    ░      ░  ░  ░     ░         ░ ░          
                            ░             
${WHITE}
>==============[${ORG}${REF}]==============<

[::] Author   :  ${RED}werbot - winks${WHITE}
[::] Github   :  ${RED}https://github.com/trezhywinks/werbot${WHITE}

[::] Try an command

[${RED}01${WHITE}] Start werbot             werbot --server
[${RED}02${WHITE}] Start derphish           werbot --phish

EOF
}


start_der(){
npm run phish
}

start_node(){
npm run server
}

banner
