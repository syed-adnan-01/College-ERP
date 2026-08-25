FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
COPY shared ./shared
COPY backend ./backend

RUN npm install

WORKDIR /app/backend

RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
