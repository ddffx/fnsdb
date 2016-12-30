# fnsdb
F N S DB

### development
```
docker run --rm -it --name fnsdb_run  -v $(pwd)/app:/usr/src/app -w /usr/src/app  fnsdb /bin/sh
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
