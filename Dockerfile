# Use the official Python base image
FROM python:3.12-slim

# Needed dependency for PGSQL to run correctly
RUN apt-get update && \
    apt-get install -y libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory to the container's application root
# This will be where manage.py is located inside the container.
WORKDIR /usr/src/app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the 'app' directory contents into the working directory
# Local path: ./app/  --> Container path: /usr/src/app/
# NOTE: The leading dot '.' means "from the directory the Dockerfile is in"
# The trailing dot '.' means "to the current WORKDIR"
COPY app/. /usr/src/app/ 

# Expose the port
EXPOSE 8000

# Default command: Runs manage.py which is now directly in WORKDIR
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]