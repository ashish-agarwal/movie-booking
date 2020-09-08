FROM node:13.11.0

ARG REGION=ap-south-1
ENV AWS_DEFAULT_REGION=$REGION

ARG KEY
ENV AWS_ACCESS_KEY_ID=$KEY

ARG SECRET
ENV AWS_SECRET_ACCESS_KEY=$SECRET

ARG ENVIRONMENT=$ENVIRONMENT

# # Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV=$ENVIRONMENT
RUN echo $REGION

# Install AWS CLI
RUN curl -O https://bootstrap.pypa.io/get-pip.py
RUN python3 get-pip.py --user --no-warn-script-location
RUN /root/.local/bin/pip3 install awscli --upgrade --user --no-warn-script-location
RUN /root/.local/bin/aws sts get-caller-identity
RUN /root/.local/bin/aws s3 cp s3://ashish-files/movies-booking.env ./.env

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
COPY package*.json ./

#test arguments
RUN echo $ENVIRONMENT

# If you are building your code for production
# RUN npm install --only=production
# building your code for dev
RUN npm install
RUN npm test

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["npm", "start" ]
