FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install
COPY . .
EXPOSE 5003
CMD ["npm", "start"]