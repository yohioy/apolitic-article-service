# apolitic-article-service

## About

```bash
REST API service to consume Articles.
Site uses a http only cookie to identify the vititor. 
Each time an artice is viewed, a log will be stored in the database.
This log will keep the user cookie ID and the viewed article.
A guest user is allowed to access up of 3 articles.
```

## Getting Started

Run the following NPM scripts in the same order.


#### 1. Setup a local DB within a docker instance

This project uses Mondodb
```bash
npm run db:start
```
DB runs on by default `localhost:27019`<br/>
DB onfiguration details are in `config/default.json`<br/>
**Mongodb Client** <br/>
MongoDb Compass is a nice GUI client to access the DB
https://www.mongodb.com/try/download/compass

#### 2. Create the Collection
```bash
npm run db:create:collections
```

#### 3. Seed the Database with dummy data
```bash
npm run db:fill:bulkdata
```
#### 4. Start the Server
```bash
npm run start
```
Server runs on by default `localhost:5069`<br/>

API Endpoints

```bash
- http://localhost:5069/api/articles
- http://localhost:5069/api/articles/[id]
```

## Other Useful Scripts

#### Clean Access Logs
```bash
npm run db:clean:accessLogs
```

#### Clean Articles
```bash
npm run db:clean:articles
```

#### Tests With Coverage
```bash
npm run test
```

## Todo list

```bash
- Add Redis to handle cache data
- Use JWT to authenticate user
```