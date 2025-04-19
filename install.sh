#!/bin/sh

sudo apt update
sudo apt install npm -y
sudo apt install ffmpeg -y
sudo apt install yt-dlp -y
sudo npm install .
chmod +x werbot
sudo cp -r werbot /bin/
echo -e "[+] Loading Werbot..."
sudo bash werbot.sh
