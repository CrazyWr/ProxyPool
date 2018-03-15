# specify the node base image with your desired version node:<version>
FROM node:8.9.4-alpine

# Install app dependencies
#COPY package.json /www/package.json
# Copy app source
#RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.6/main" > /etc/apk/repositories

COPY . /ProxyPool

RUN apk add --update \
    && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.6/main" > /etc/apk/repositories \
    && apk --no-cache add python \
    && npm config set registry 'https://registry.npm.taobao.org' \
    && yarn config set registry 'https://registry.npm.taobao.org' \
    && npm install yarn -g \
    && cd /ProxyPool \
    && yarn install
    # && apk del native-deps \


# Set work directory to /ProxyPool
WORKDIR /ProxyPool

CMD  yarn run dockerStart
