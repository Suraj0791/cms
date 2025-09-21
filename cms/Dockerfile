FROM node:18-alpine

# Install dependencies needed for Sharp
RUN apk add --no-cache \
    libc6-compat \
    vips-dev

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies with specific Sharp configuration
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

EXPOSE 3001

CMD ["yarn", "serve"]
