# razzle-ts-boilerplate

## Quickstart
```
git clone https://github.com/alexbechmann/razzle-ts-boilerplate.git my-app
cd my-app
yarn 
yarn start
```

## Develop

### yarn
```
yarn
yarn start
```

or

### docker
```
yarn
docker-compose up --build
```

## Production

### yarn
```
yarn run build
yarn run start:prod
```

or 

### docker
```
docker-compose -f docker-compose.yml up --remove-orphans --build
```