FROM node:20-slim

WORKDIR /app

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

# Node.jsユーザーに変更
USER node

# 初期化とセットアップのためのコマンドを実行
CMD ["sh", "-c", "\
    if [ ! -f package.json ]; then \
        cd /tmp && \
        printf 'n\n' | npx create-next-app@14.1.0 temp-next \
            --typescript \
            --tailwind \
            --eslint \
            --app \
            --src-dir \
            --use-npm \
            --import-alias '@/*' && \
        if [ -d /tmp/temp-next ]; then \
            cp -r /tmp/temp-next/* /app/ && \
            cd /app && \
            npm install \
                @mui/material@5.14.0 \
                @emotion/react@11.11.1 \
                @emotion/styled@11.11.0 \
                @mui/icons-material@5.14.0 \
                react@18.2.0 \
                react-dom@18.2.0 \
                react-icons@4.10.0 && \
            rm -rf /tmp/temp-next; \
        else \
            echo 'Failed to create Next.js project' && \
            exit 1; \
        fi; \
    fi && \
    npm run dev \
"]