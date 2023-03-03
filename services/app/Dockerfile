FROM node:18-alpine

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install

EXPOSE 5173

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]