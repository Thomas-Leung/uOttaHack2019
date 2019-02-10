FROM debian:buster

RUN apt-get update -y && \
    apt-get install -y python3-pip

COPY ./requirements.txt ./requirements.txt

WORKDIR ./app

RUN pip3 install google-cloud-language && \
    pip3 install Flask

COPY . ./app

RUN chmod +x ./app/run.sh

CMD ["./app/run.sh"]


