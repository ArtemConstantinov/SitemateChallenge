## App Structure

```
|- config
|    |
|    |- dockerfiles (Collections of dockerfiles)
|    |- nginx (Configurations for Nginx)
|    |- python (Requirements and configurations for Python)
|
|- project
|    |
|    |- client (NextJS src files)
|    |- server (FastAPI src files)
|
|- storage (Individual to each setup)
|    |
|    |- data (place for datafiles)
|    |- logs (logs from each service)
|
|- docker-compose.yml

```
## Start the ptoject

```shell
> docker-compose up
```

After all docker images are builded and all containers are started, open your browser to

```https://localhost```

> The application is using self signed certificate, please confirm open the site in your browser alert window
