FROM node:25
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN pnpm install
CMD ["sh"]
