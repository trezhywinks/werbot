#!/bin/sh

sudo apt update
sudo apt install npm -y
sudo apt install ffmpeg -y
sudo apt install yt-dlp -y
sudo npm install .
chmod +x werbot
mv werbot /bin/
echo -e "[+] Loading Werbot..."
sudo bash werbot.sh
