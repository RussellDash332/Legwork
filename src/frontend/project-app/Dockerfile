# syntax=docker/dockerfile:1

FROM ubuntu:latest

# Set up working dircetory
WORKDIR /docker-app

# Copy app files from local folder
COPY . .

# Update ubuntu and install relevant packages
RUN apt update
RUN apt upgrade -y
RUN apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
	apt-get install -y nodejs
RUN npm install --global yarn 

# Install app packages
RUN npm install --legacy-peer-deps

# Expose port 3000
EXPOSE 3000

# Entrypoint command up container start up
CMD ["npm", "start"] 