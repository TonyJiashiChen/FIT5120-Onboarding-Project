FROM python:3.9

# set the working directory in the container
WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy everything from the current directory to the PWD (Present Working Directory) inside the container
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

