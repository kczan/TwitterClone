# pull official base image
FROM python:3.6.9-slim-buster

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies with OpenCV
RUN apt-get update && apt-get install -y --no-install-recommends \
        tzdata \
        python3-setuptools \
        python3-pip \
        python3-dev \
        python3-venv \
        git \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# install environment dependencies
RUN pip3 install --upgrade pip 

# copy project
COPY . .

# Install project dependencies

RUN pip install -r requirements.txt --no-dependencies


CMD gunicorn TwitterClone.wsgi:application --bind 0.0.0.0:$PORT

