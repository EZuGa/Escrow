FROM python:3.10.6-slim

WORKDIR /code/

ARG DEV_MODE=false
ARG UID=1000
ARG GID=1000
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/code

RUN apt update && apt install curl -y && \
    curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    ln -s /opt/poetry/bin/poetry /usr/local/bin && \
    chmod 755 /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY ./pyproject.toml ./poetry.lock* /code/
RUN if [ "$DEV_MODE" = "true" ]; then \
        poetry install --no-root; \
    else \
        poetry install --no-root --only=main; \
    fi

RUN chown -R "$UID:$GID" /code && \
    if ! id "$UID" &>/dev/null; then \
        useradd -m -u "$UID" docker; \
    fi

COPY . /code/

USER ${UID}:${GID}
EXPOSE 8080