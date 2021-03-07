FROM node:15.11.0-alpine3.13
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

COPY . ./

CMD ["npm", "start"]