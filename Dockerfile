FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate

EXPOSE 5000
CMD node dist/src/index.js