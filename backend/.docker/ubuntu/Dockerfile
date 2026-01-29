FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Ho_Chi_Minh

RUN apt-get update -y

###########################################################################
# Install php
###########################################################################

RUN apt-get install -y software-properties-common
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN apt-get update -y
RUN add-apt-repository -y ppa:ondrej/php
RUN apt-get update -y

RUN apt-get install -y php8.5-fpm
RUN apt-get install -y php8.5-common php8.5-mysql php8.5-xml php8.5-xmlrpc php8.5-curl php8.5-gd php8.5-imagick php8.5-cli php8.5-imap php8.5-mbstring php8.5-zip php8.5-intl php8.5-bcmath

###########################################################################
# Install nginx
###########################################################################

RUN apt-get install -y nginx

###########################################################################
# Install node & npm & pm2
###########################################################################
RUN apt-get install -y curl ca-certificates gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update -y
RUN apt-get install -y nodejs
RUN npm install -g pm2

# Update node version suitable to the project

#RUN ls $HOME

#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
#SHELL ["bash", "-lc"]  # This similar to restart terminal (to get nvm work)
#SHELL ["bash", "-lc"]
#ENV NVM_DIR=/root/.nvm
#RUN . $HOME/.nvm/nvm.sh && nvm install 10.21.0 # Install correct node version

###########################################################################
# Install common util
###########################################################################

RUN apt-get install -y procps
RUN apt-get install -y cron
RUN apt-get install -y nano
RUN apt-get install -y curl
RUN apt-get install -y mysql-server

ENTRYPOINT ["/startup.sh"]
