FROM node:14
COPY ./package.json .
RUN npm install
COPY . .
ENV PORT=5000
ENTRYPOINT ["npm", "start"]
