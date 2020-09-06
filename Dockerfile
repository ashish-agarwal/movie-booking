FROM node:13.11.0

ARG ENVIRONMENT=$ENVIRONMENT

# # Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=$ENVIRONMENT

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
COPY package*.json ./

#test arguments
RUN echo $ENVIRONMENT

# If you are building your code for production
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["npm", "start" ]
