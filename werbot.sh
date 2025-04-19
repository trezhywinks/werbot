#!/bin/bash

RED="$(printf '\033[31m')"  WHITE="$(printf '\033[37m')"
ORG="$(printf '\e[1;93m Werbot Ver : 1.0')"
REF="$(printf ' \e[1;37m\n')"

PWD=`command pwd`

printf " \e[1;37m Welcome user\n"


PLAY1="${WHITE}┌──(${RED}werscript${WHITE})-[~${PWD}]
└─${RED}>${WHITE}"


banner(){
clear
cat << EOF
Welcome to werbot, user.
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

[::] Select an number

[${RED}01${WHITE}] Start werbot
[${RED}02${WHITE}] Start derphish          [${RED}00${WHITE}] Exit

EOF

read -p "${PLAY1} " 

case $REPLY in
01 | 1)
##clear;
start_node;;
02 | 2)
start_der;;
00 | 0)
exit;;
*)
echo -ne  "\n[!] Erro, Try Again..."
{ sleep 0.75; clear; banner; }
esac
}


start_der(){
npm run phish
}

start_node(){
npm run server
}

banner
