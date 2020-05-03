FROM node:12.14.1
EXPOSE 8443
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
COPY config.json-default config.json
RUN openssl req \
    -new \
    -newkey rsa:4096 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" \
    -keyout privkey.pem \
    -out fullchain.pem
CMD npm run solid start
