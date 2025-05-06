FROM node:18.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

CMD ["node", "server.js"] 