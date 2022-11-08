FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY . /app
WORKDIR /app
RUN pip3 install -r requirements.txt
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
CMD gunicorn -b 0.0.0.0:8000 --worker-class=gevent --worker-connections=1000 --workers=5 backend.wsgi
