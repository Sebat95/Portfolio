### Build Stage
FROM node:23-alpine AS build 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

### Production Stage
FROM nginx:1.27.4-alpine AS production
# Expose port (GCP default is 8080)
ENV PORT=8080
COPY nginx.conf /etc/nginx/templates/nginx.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE $PORT
# Replace env $PORT in the nginx conf and run the server
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
