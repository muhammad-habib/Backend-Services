FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8
WORKDIR /producer

COPY  ./ /producer

RUN pip install -r /producer/requirements.txt \
    && rm -rf /root/.cache/pip


ENV PYTHONUNBUFFERED 1

EXPOSE 8000

ENTRYPOINT ["python", "main.py"]
