FROM serenainzanimea/LBG-API
COPY ./package.json .
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]
