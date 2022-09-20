FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
# RUN npm config set strict-ssl false
# RUN npm config set registry=https://registry.npmjs.org/
# RUN npm i
CMD ["npm", "run", "start"]