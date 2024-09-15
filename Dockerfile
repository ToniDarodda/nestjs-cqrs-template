ARG NODE_VERSION=20

FROM node:${NODE_VERSION} AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm \
    && pnpm install

COPY . .

RUN pnpm run build

FROM node:${NODE_VERSION} AS final

WORKDIR /app

ENV FRONTEND_PATH=http://localhost:3000

COPY --from=build /app/dist ./dist

COPY --from=build /app/.env.development ./

COPY --from=build /app/.env.production ./

COPY --from=build /app/node_modules ./node_modules

COPY package*.json ./

# Copy the startup script
COPY start.sh ./

RUN chmod +x start.sh

EXPOSE 3000

# Use the startup script as the entry point
ENTRYPOINT [ "./start.sh" ]
