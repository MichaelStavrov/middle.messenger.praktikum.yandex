FROM ubuntu:18.04
RUN apt update && apt install -y wget
WORKDIR /var/www
COPY . .
RUN chmod +x ./build.sh
EXPOSE 3000
RUN ./build.sh
RUN apt install -y nodejs
CMD ["node", "server.js"]