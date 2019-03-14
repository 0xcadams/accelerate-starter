FROM node:11

# Download dumb-init for help with handling signals - https://github.com/Yelp/dumb-init
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64
RUN chmod +x /usr/local/bin/dumb-init

# Setting working directory. All the paths will be relative to WORKDIR
WORKDIR /usr/src/app

# Copy files
COPY yarn.lock .babelrc *.js *.json ./
COPY src/ src/

# Install Node.js dependencies
RUN yarn install --frozen-lockfile

# set NODE_ENV to production by default
ENV NODE_ENV=production

# Building app
RUN yarn build

# Runs "/usr/local/bin/dumb-init -- node build/server.js"
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

# switch to node user for security purposes
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

# Running the app
CMD [ "node", "./app/server.js" ]
