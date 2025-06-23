# ベースイメージを指定（Node.js のバージョンは必要に応じて変更）
FROM node:18

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# コンテナがリッスンするポートを指定
EXPOSE 3000

# アプリケーションを実行
CMD ["npm", "run", "start"]