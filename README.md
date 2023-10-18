## Description
학교 소식 피드 관리

## Installation

```bash
$ git clone https://github.com/Kimsunmin/school-news-app.git
$ cd school-new-app
$ npm install
```

## Make .env
.env sample (해당 프로젝트는 postgresql5 사용)
```
# Server
PORT=

# DataBase 
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# JWT
SECRET_KEY=
EXPIRES_IN=360s
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Docs & Test
아래의 경로로 접근
```
http://localhost:{port}/api-docs
```

