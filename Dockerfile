FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173
EXPOSE 3001

CMD ["npm","run","dev"]