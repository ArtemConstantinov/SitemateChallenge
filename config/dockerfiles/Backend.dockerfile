FROM python:3.11.0-slim-buster as base

ENV APP_ROOT /app
ENV PORT 8000

RUN mkdir ${APP_ROOT} && \
    python -m pip install --upgrade pip


FROM base as backend-development

RUN mkdir /config
COPY /config/python/requirements.txt /config/

RUN pip install -r /config/requirements.txt && \
    rm -rf \
        /root/.cache \
        /var/lib/apt/lists/* \
        /tmp/* \

WORKDIR ${APP_ROOT}

CMD exec uvicorn src.main:app --root-path /api --reload --host 0.0.0.0 --port $PORT


