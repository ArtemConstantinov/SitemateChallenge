FROM node:18.17-alpine3.17 AS base

ENV APP_ROOT /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST 0.0.0.0

RUN mkdir -p ${APP_ROOT} && \
    sed -i 's/dl-cdn.alpinelinux.org/mirror.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
	echo "**** Install build packages ****" && \
    npm config set registry https://registry.npm.taobao.org/

WORKDIR ${APP_ROOT}


FROM base AS development

ENV NODE_ENV=development

COPY /project/client/package.json ${APP_ROOT}
COPY /project/client/yarn.lock ${APP_ROOT}
RUN yarn install