FROM node:latest

MAINTAINER Jonathan Foster <jxf9099@rit.edu>

# use nodemon for development
RUN npm install --global nodemon

# use cached layer for node modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /code && cp -a /tmp/node_modules /code

# add project files
WORKDIR /code
ADD . /code

CMD ["nodemon", "-L", "/code/app.js"]
