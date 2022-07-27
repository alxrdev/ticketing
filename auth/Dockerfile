FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install --only=prod

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

CMD ["npm", "start"]