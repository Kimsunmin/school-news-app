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
PORT=3000

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
http://localhost:3000/api-docs
또는
프로젝트 내에 Specification.yaml을 https://editor.swagger.io/ 에서 확인 가능


## API
- Controller
```
POST: /auth/signon  유저생성
POST: /auth/signin  유저 토큰 생성
```
```
- 권한 role: ADMIN
POST: /admin/create-school  학교 페이지 생성
POST: /admin/{schoolId}/create-news 학교 소식 생성
PATCH: /admin/update-news/{newsId}  학교 소식 수정
DELETE: /admin/delete-news/{newsId}  학교 소식 삭제
```
```
- 권한 role: STUDENT
POST: /student/subscribe/{schoolId}  학교 페이지 구독
GET: /student/subscribe  구독 목록 조회
GET: /student/{schoolId}/news  학교 페이지 소식 조회
DELETE: /student/subscribe-cancel/{id} 학교 페이지 구독 취소
```
