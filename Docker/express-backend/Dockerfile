FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=root

WORKDIR /testapp

COPY . .

RUN npm install

CMD ["node", "src/server.js"]
