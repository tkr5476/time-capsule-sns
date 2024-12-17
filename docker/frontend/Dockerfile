FROM node:18-alpine

WORKDIR /app

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

# Node.jsユーザーに変更
USER node

# 初期化とセットアップのためのコマンドを実行
CMD ["sh", "-c", "\
    if [ ! -f package.json ]; then \
        cd /tmp && \
        printf 'n\n' | npx create-next-app@latest temp-next \
            --typescript \
            --tailwind \
            --eslint \
            --app \
            --src-dir \
            --use-npm \
            --no-experimental-app \
            --import-alias '@/*' && \
        if [ -d /tmp/temp-next ]; then \
            cp -r /tmp/temp-next/* /app/ && \
            cd /app && \
            npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-icons && \
            rm -rf /tmp/temp-next; \
        else \
            echo 'Failed to create Next.js project' && \
            exit 1; \
        fi; \
    fi && \
    npm run dev \
"]