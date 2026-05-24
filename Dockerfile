# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app



# Throw-away build stage to reduce size of final image
FROM base AS build

# Build in development mode so devDependencies (Vite plugins) are installed
ENV NODE_ENV="development"

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules - copy both root and workspace package files
COPY package-lock.json package.json ./
COPY client/package-lock.json client/package.json ./client/
RUN npm ci --workspaces

# Copy application code
COPY . .

# Build application
RUN npm run build


# Final stage for app image
FROM base

# Run final image in production mode
ENV NODE_ENV="production"

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
