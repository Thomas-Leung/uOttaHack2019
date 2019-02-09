# install dependencies
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs


# clone the project
git clone https://github.com/Thomas-Leung/uOttaHack2019.git
cd uOttaHack2019/api/src
nodejs app.js