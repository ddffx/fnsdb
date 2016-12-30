FROM node:alpine

# Install dependencies 
RUN npm set progress=false && \
    npm install -g --progress=false yarn
# Add source
ADD ./app /usr/local/app
WORKDIR /usr/local/app
# link current project globally
RUN npm link
# default shows the version of the tool
CMD cli --version
