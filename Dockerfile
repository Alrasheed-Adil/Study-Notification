docker pull ghcr.io/puppeteer/puppeteer:22.8.2

ENV PUPPETEER_SKIP_CHROMIUM-DOWNLOAD=true \ 
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci 
COPY ..
CMD ["node","./bin/www"]