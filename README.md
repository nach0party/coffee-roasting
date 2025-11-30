## Starting the project:

run:

```bash
docker build -t coffee-roasting-api ./app/backend/
docker build -t coffee-roasting-frontend ./app/frontend/
docker compose up --build
```

re-run prebuilt container (fastest way to start already installed):

```
docker compose up
```

restarting the containers

```bash
docker compose down && docker compose up
```

restarting the containers and full rebuild

```bash
docker compose down && docker compose --build --no-cache && docker compose up
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
