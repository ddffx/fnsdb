FROM node:alpine

RUN npm set progress=false && \
    npm install -g --progress=false yarn
ADD ./app /usr/local/app
WORKDIR /usr/local/app
RUN npm link
CMD cli --version
