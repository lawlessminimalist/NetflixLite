FROM python:3.8-slim

WORKDIR /app
COPY requirements.txt .

# Create a layer with all the requirements required for the server
RUN pip install --no-cache-dir -r requirements.txt

# Copy the contents of the server from the /app folder to the container
COPY /app .


ENV FLASK_APP=./__init__.py

EXPOSE 8000

CMD ["flask", "run", "--host=0.0.0.0","--port=8000"]
