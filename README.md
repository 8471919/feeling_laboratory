# 마음 연구소 과제입니다.

## 데이터베이스

![DB ERD](image.png)

- 링크
  https://www.erdcloud.com/p/CtuA9BphnfQsz8FAi

## 설명

- 도커를 사용하여 실행하는 방법을 소개합니다.
  - Postgresql 설정도 다 해두었으니, api만 실행시키시면 됩니다.
- `/api-docs` 경로에 Swagger를 작성해두었습니다. 테스트 시, 스웨거를 이용하시면 됩니다.
- 간단한 e2e Test를 작성해두었습니다. 명령어는 `npm run test:e2e` 입니다. 하지만, 이 경우 따로 로컬에서 `.env` 파일을 설정해야합니다.

  - 아래와 같이 env 파일을 작성합니다.

  ```
  NEST_PORT=4000

  # DB 관련 설정
  DB_HOST=localhost
  DB_PORT=5432 (본인의 postgresql 포트번호)
  DB_USERNAME=본인의 username
  DB_PASSWORD=본인의 비밀번호
  DB_DATABASE=새로 생성한 DB
  ```

  - `.env`파일 작성 후, `npm run schema:sync` 를 통하여 DB를 동기화합니다.
  - 그 후, `npm run test:e2e` 명령을 통해 e2e테스트를 진행할 수 있습니다.

### 유의사항 및 구현사항

- 유저 테이블은 따로 만들지 않았습니다.
- 로그인을 따로 구현하지 않았습니다. 작성자 명으로만 설문을 구분합니다.
- 임시저장 같은 기능은 따로 구현하지 않았습니다.
- 설문지, 문항, 선택지, 답변 CRUD 모두 구현하였습니다..
- 설문지 완료의 경우 컴포넌트(설문 답변) 하나하나 마다 생성하게 하였으므로, 설문지 완료 버튼을 클릭하면 따로 완료 설문지 api로 Redirect시키면 됩니다.
- 완료된 설문지 확인의 경우 `GET /api/answer-questionnaire/{id}` 를 통해 읽어올 수 있도록 하였습니다.
- 답변 설문지의 경우 따로 볼 수 있게 하지 않았습니다. 사용자가 화면을 벗어날 시, 임시저장을 위해 불러올 수 있도록 id값을 암호화하여 쿠키에 넣어줄 때 사용하는 용도로만 만들어두었습니다.
- 답변 총점의 경우, 연산이 필요하기 때문에 프론트에서 점수를 합연산하여 클라이언트 개인이 부담하도록 하는게 좋다고 판단하였습니다. (따로 총 점수 칼럼을 두지 않았습니다.)
- 에러 처리의 경우 HttpExceptionFilter를 두어, 일관된 에러를 뱉도록 하였습니다.

```typescript
// ex
{
  success: false,
  code: statusCode,
  timestamp: new Date().toISOString(),
  path: request.url,
  message,
  // data의 code와 message는 개발자가 직접 던지는 statusCode와 message입니다.
  data: {
    code,
    message
  }
}

```

- 로그를 위해 LogMiddleware를 모든 경로에 적용하였습니다. 또한, HttpExceptionFilter에 로거를 추가하여 에러 발생시 로그를 추가적으로 출력하도록 하였습니다.

### 기능

**설문지**

- `POST /api/questionnaire`
  - 설문지 생성 : 설문지 생성은 생성 버튼을 클릭할 시, 설문지만 따로 생성할 수 있도록 하였습니다.
- `GET /api/questionnaire/{id}`
  - 설문지 읽기 : 한 설문지에 대한 자세한 내용들(질문, 선택지 포함)을 읽어옵니다.
- `PUT /api/questionnaire/{id}`
  - 설문지 수정 : 설문지를 수정합니다. 제목과 설명 위주로 수정 가능합니다. 질문과 선택지는 따로 수정해야합니다.
- `DELETE /api/questionnaire/{id}`
  - 설문지 삭제 : 설문지를 삭제합니다. SoftDelete를 적용합니다. 이 때, 질문과 선택지 또한 cascade로 SoftDelete됩니다.

**질문(설문 문항)**

- `POST /api/question`
  - 질문 생성 : 설문지에 대한 질문을 생성합니다. 이 때, order는 프론트에서 현재 존재하는 질문들의 순서를 파악하여 넘겨줍니다. (ex. 현재 설문지에 대한 질문에 2개 존재하는 상황에서 하나의 질문들 더 생성할 시, order=3이 들어가도록)
- `GET /api/question/list`
  - 질문 목록 읽기 : 해당 설문지에 대한 질문 목록을 불러옵니다. 이 때, 질문에 대한 선택지들도 함께 불러옵니다.
- `PUT /api/question/{id}`
  - 질문 수정 : 설문 문항을 수정합니다. order를 위하여 설문 수정시 프론트 측에서 한번에 Update를 날려주어야 합니다.
- `DELETE /api/question/{id}`
  - 질문 삭제 : 질문을 삭제합니다. 이 때, 질문에 대한 선택지 또한 함께 SoftDelete됩니다.

**선택지**

- `POST /api/question-option`
  - 선택지 생성 : 질문에 대한 선택지를 생성합니다. 이 때, order는 프론트에서 현재 존재하는 선택지들의 순서를 파악하여 넘겨줍니다.
- `GET /api/question-option`
  - 선택지 목록 불러오기 : 질문에 대한 선택지 목록을 불러옵니다.
- `PUT /api/question-option/{id}`
  - 선택지 수정 : 선택지를 수정합니다.
- `DELETE /api/question-option/{id}`
  - 선택지 삭제 : 선택지를 삭제합니다.

**답변**

- `POST /api/answer-questionnaire`
  - 답변 설문지 생성 : 답변에 대한 설문지를 생성합니다.
- `GET /api/answer-questionnaire`
  - 답변 설문지 목록 읽기 : 설문지에 대한 답변 설문지 목록을 불러옵니다.
- `GET /api/answer-questionnaire/{id}`
  - 답변 설문지 읽기 : 답변 설문지에 대한 자세한 내용을 읽어옵니다.
- `DELETE /api/answer-questionnaire/{id}`
  - 답변 설문지 삭제 : 답변 설문지를 삭제합니다.
- `POST /api/answer-question`
  - 답변 생성 : 답변 설문지에 대한 답변을 생성합니다.
- `PUT /api/answer-question/{id}`
  - 답변 수정 : 답변을 수정합니다.

---

## 실행 방법

### 사전 준비

- docker와 docker-compose가 설치되어 있어야 합니다.

### 명령어

1. 먼저, 프로젝트를 로컬로 가져옵니다.

```bash
git clone https://github.com/8471919/feeling_laboratory
```

</br>

2. `.env` 파일을 생성하고, 프로젝트 폴더 최상위에 위치합니다. (package.json과 동일한 위치) 파일 내용은 아래와 같습니다.

```
NEST_PORT=4000

# DB 관련 설정
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=test
DB_PASSWORD=test1234
DB_DATABASE=questionnaire

POSTGRES_USER=test
POSTGRES_DB=questionnaire
POSTGRES_PASSWORD=test1234
TZ=Asia/Seoul
```

3. docker compose를 이용하여 실행시킵니다.

- Postgresql 설정은 이미 다 되어있습니다. api만 실행시키면 됩니다.
- 이 때, 도커 버전에 따라 실행 명령이 상이할 수 있습니다.

```bash

docker-compose up -d

# 위 명령으로 실행 불가능하다면
docker compose up -d

```

4. 컨테이너가 실행이 되었다면, 스웨거 문서를 들어갑니다.

- `http://127.0.0.1:4000/api-docs` 로 접속하실 수 있습니다.
