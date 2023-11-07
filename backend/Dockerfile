FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install --quiet
COPY . .
RUN sudo chmod -R 777 /app
EXPOSE 3000
