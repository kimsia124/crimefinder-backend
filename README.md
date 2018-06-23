# crimefinder-backend
2018 나르샤 프로젝트 Crimefinder back-end

**Install**
```
npm install express
npm install mysql
npm install body-parser
```



DB정보

- 데이터베이스명 : crimefinder
- 테이블명 : crime



- 컬럼명 의미 type 비고

id        아이디      int            AUTO_INCREMENT, PRIMARY_KEY
lat       위도        text
lng       경도        text
author    작성자      varchar(255)
time      작성시간     time          defalut=CURRENT_TIMESTAMP
content   내용        text
type      범죄시간     varchar(3)
flag      승인 여부    varchar(1)