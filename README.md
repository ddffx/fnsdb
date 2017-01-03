# fnsdb
F N S DB

### development
```
docker run --rm -it --name fnsdb_run  -v $(pwd)/app:/usr/src/code -w /usr/src/code  fnsdb /bin/sh
```
### With docker development is easy 
all configs are declared on the compose file
```
docker-compose run --rm  cli-dev /bin/sh
```
Then do development work

### build
```
docker build -t fnsdb .
```

### docker run commands
```
docker run --rm fnsdb cli --version
```
