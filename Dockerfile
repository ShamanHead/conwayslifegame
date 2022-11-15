FROM nginx:1.23.2

RUN apt-get -y update
RUN apt-get -y install neovim
