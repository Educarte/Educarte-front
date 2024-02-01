# Build the React App.
FROM node:18 AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY . ./
RUN npm install -g pnpm && pnpm install
ENV VITE_APP_TITLE="Educarte"
ENV VITE_APP_DESCRIPTION="Tenha controle de todos os seus ativos"
ENV VITE_APP_KEY="EDUCARTE"
ENV VITE_APP_HOME="/app/employees"
ENV VITE_API_URL="http://67.207.83.50:5000/"
RUN pnpm build

# Set up the nginx server.
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
