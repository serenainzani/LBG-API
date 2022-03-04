FROM node:14
COPY ./package.json .
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]
