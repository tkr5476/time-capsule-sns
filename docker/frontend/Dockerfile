FROM node:18-alpine

WORKDIR /app

# ホットリロード用の環境変数を追加
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# 開発サーバー起動時のホストを0.0.0.0に設定
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]