## Starting the project:

run:
```bash
docker build -t coffee-roasting-api .
docker compose up --build
```

exec:
```bash
docker exec -it coffee-roasting-api bash
docker exec -it coffee-roasting-database bash
```

Need to figure out a good / best way to run this 
Once exec'd into the main container:
```bash
python manage.py migrate
```

## If you're having trouble:

debug:
```bash
docker-compose run --rm api sh #FIXME image name
```