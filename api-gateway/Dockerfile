FROM node:18.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV PRODUCT_SERVICE_URL=https://grocery-product-service.onrender.com

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"] 