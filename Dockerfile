FROM node:alpine

# Install dependencies 
RUN npm set progress=false && \
    npm install -g --progress=false yarn
# Add a data VOLUME
RUN mkdir -p /data/db
VOLUME ['/data']
# Add source
ADD ./app /usr/local/app
WORKDIR /usr/local/app

RUN yarn install 
# link current project globally
RUN npm link
# Download lastest from the sources
RUN cli builddb
# default shows the version of the tool
CMD cli --version
