# AIC-Assistant

**AIC-Assistant**는 명일방주: 엔드필드(Arknights: Endfield)의 유저 보유 데이터를 기반으로 캐릭터와 무기 통계를 확인할 수 있는 비공식 팬 메이드 웹 서비스입니다.

크롬 확장 프로그램을 통해 게임 페이지에서 감지한 데이터를 사용자가 직접 공유하면, 서버에 저장된 데이터를 바탕으로 개인 보유 현황과 전체 통계를 확인할 수 있습니다.

---

## 프로젝트 소개

AIC-Assistant는 게임사에서 별도로 제공하지 않는 유저 보유 데이터 기반 통계를 직접 수집하고 시각화해 보기 위해 제작한 프로젝트입니다.

사용자는 Endfield 추천 팀 편성 페이지에서 크롬 확장 프로그램을 실행해 자신의 데이터를 감지할 수 있습니다. 감지된 데이터는 사용자가 직접 공유 버튼을 눌렀을 때만 서버로 전송되며, 이후 개인 데이터 페이지와 전체 통계 페이지에서 확인할 수 있습니다.

이 프로젝트는 단순히 데이터를 입력하고 조회하는 CRUD 서비스가 아니라, 외부 웹 페이지에서 필요한 데이터를 감지하고, 백엔드에 저장한 뒤, 이를 통계 화면으로 보여주는 전체 흐름을 구현하는 데 초점을 두었습니다.

---

## 주요 기능

### 크롬 확장 프로그램을 통한 데이터 감지

Endfield 추천 팀 편성 페이지에서 `user-game-data`를 감지하고, 서비스에 필요한 데이터만 추출합니다.

감지된 데이터는 바로 서버로 전송되지 않고, 사용자가 확장 프로그램 팝업에서 직접 공유 버튼을 눌렀을 때만 전송됩니다.

전송하는 정보는 다음과 같습니다.

- `roleId`
- 캐릭터 보유 데이터
- 무기 보유 데이터
- 데이터 감지 시간

다음 정보는 저장하거나 전송하지 않습니다.

- 쿠키
- 토큰
- 로그인 정보
- 요청 헤더 전체
- `sign`, `cred` 등 인증 관련 값

---

### 개인 데이터 페이지

공유한 데이터를 기준으로 사용자의 개인 보유 현황을 확인할 수 있습니다.

- 보유 캐릭터 목록
- 보유 무기 목록
- 캐릭터 레벨
- 캐릭터 정예화 단계
- 마지막 동기화 시간
- 캐릭터/무기 검색
- 상세 페이지 이동

개인 데이터 페이지는 확장 프로그램에서 데이터를 공유한 뒤, 실제로 어떤 데이터가 저장되었는지 확인하는 용도로 구성했습니다.

---

### 전체 통계 페이지

서버에 공유된 전체 유저 데이터를 기준으로 캐릭터와 무기의 보유율을 확인할 수 있습니다.

- 캐릭터 보유율
- 무기 보유율
- 캐릭터/무기 탭 전환
- 이름 검색
- 전체/보유 데이터 필터
- 성급, 속성, 직업군, 무기 타입 필터
- 정렬 기능

정렬 기준은 다음과 같습니다.

- 보유율 높은 순
- 보유율 낮은 순
- 이름순
- 성급 높은 순

---

### 캐릭터 상세 페이지

캐릭터별 상세 통계를 확인할 수 있습니다.

- 캐릭터 이미지
- 성급
- 속성
- 직업군
- 사용 무기
- 보유율
- 보유 인원 / 전체 유저 수
- 정예화 단계 분포
- 주요 레벨 구간 분포

레벨 분포는 다음 기준으로 나누었습니다.

| 구간  | 기준            |
| ----- | --------------- |
| `60+` | 60 이상 80 미만 |
| `80+` | 80 이상 90 미만 |
| `90`  | 90              |

---

### 무기 상세 페이지

무기별 상세 정보를 확인할 수 있습니다.

- 무기 이미지
- 성급
- 무기 타입
- 보유율
- 보유 인원 / 전체 유저 수
- 무기 설명
- 스킬 정보

---

### 메타데이터 자동 생성

초기에는 캐릭터와 무기 정보를 직접 매핑했지만, 관리가 어려워져 원본 JSON 데이터를 기준으로 TypeScript 메타데이터 파일을 자동 생성하도록 개선했습니다.

원본 데이터는 다음 위치에 저장합니다.

```text
src/data/raw/search-chars.json
src/data/raw/search-weapons.json
```

스크립트를 실행하면 아래 파일이 생성됩니다.

```text
src/data/operators.ts
src/data/weapons.ts
```

---

## 기술 스택

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

### Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Oracle XE
- Lombok

### Chrome Extension

- Manifest V3
- Content Script
- Injected Script
- Popup UI
- Chrome Storage API

---

## 프로젝트 구조

```text
ef_data/
├─ back/
│  ├─ src/main/java/com/ef_data/back/
│  │  ├─ config/
│  │  ├─ controller/
│  │  ├─ dto/
│  │  ├─ entity/
│  │  ├─ repository/
│  │  └─ service/
│  ├─ src/main/resources/
│  │  └─ application.properties
│  ├─ build.gradle
│  └─ settings.gradle
│
├─ front/
│  ├─ public/
│  ├─ scripts/
│  │  └─ generate-endfield-meta.mjs
│  ├─ src/
│  │  ├─ api/
│  │  │  └─ config.ts
│  │  ├─ data/
│  │  │  ├─ raw/
│  │  │  ├─ operators.ts
│  │  │  └─ weapons.ts
│  │  ├─ pages/
│  │  ├─ styles/
│  │  ├─ App.tsx
│  │  └─ main.tsx
│  ├─ package.json
│  └─ .env.example
│
└─ chrome/
   └─ ef-data-helper-extension/
      ├─ manifest.json
      ├─ config.js
      ├─ content.js
      ├─ injected.js
      ├─ popup.html
      └─ popup.js
```

---

## 주요 페이지

| 경로                                      | 설명                    |
| ----------------------------------------- | ----------------------- |
| `/`                                       | 홈 페이지               |
| `/endfield`                               | 홈 페이지               |
| `/endfield/statistics`                    | 전체 통계 페이지        |
| `/endfield/statistics/characters/:charId` | 캐릭터 상세 통계 페이지 |
| `/endfield/statistics/weapons/:weaponId`  | 무기 상세 페이지        |
| `/my/endfield/:roleId`                    | 개인 데이터 페이지      |

---

## API 구조

### 데이터 공유

```http
POST /api/endfield/import/user-game-data
```

크롬 확장 프로그램에서 감지한 유저 게임 데이터를 서버에 저장합니다.

```json
{
  "roleId": "4013416473",
  "userChars": {},
  "userWeapons": {},
  "detectedAt": "2026-06-05T05:09:19.358Z"
}
```

---

### 개인 데이터 조회

```http
GET /api/endfield/users/{roleId}/profile
GET /api/endfield/users/{roleId}/characters
GET /api/endfield/users/{roleId}/weapons
```

---

### 통계 조회

```http
GET /api/endfield/statistics/summary
GET /api/endfield/statistics/characters/ownership
GET /api/endfield/statistics/weapons/ownership
```

---

### 캐릭터 상세 통계

```http
GET /api/endfield/statistics/characters/{charId}/evolve-phase
GET /api/endfield/statistics/characters/{charId}/level-distribution
```

---

## 실행 방법

### Backend 실행

```bash
cd back
./gradlew bootRun
```

Windows PowerShell에서는 다음 명령어를 사용합니다.

```powershell
cd back
.\gradlew bootRun
```

기본 실행 주소는 다음과 같습니다.

```text
http://localhost:8080
```

---

### Frontend 실행

```bash
cd front
npm install
npm run dev
```

기본 실행 주소는 다음과 같습니다.

```text
http://localhost:5173
```

---

## 환경변수 설정

프론트엔드는 API 서버 주소를 환경변수로 관리합니다.

`front/.env` 파일을 생성하고 아래 내용을 입력합니다.

```env
VITE_API_BASE_URL=http://localhost:8080
```

예시 파일은 다음 위치에 둘 수 있습니다.

```text
front/.env.example
```

`.env`를 수정한 뒤에는 Vite 개발 서버를 다시 실행해야 변경 사항이 반영됩니다.

---

## 메타데이터 생성 방법

`front/src/data/raw/` 폴더에 아래 파일을 저장합니다.

```text
search-chars.json
search-weapons.json
```

그다음 아래 명령어를 실행합니다.

```bash
cd front
node scripts/generate-endfield-meta.mjs
```

생성 결과는 다음 파일에 반영됩니다.

```text
src/data/operators.ts
src/data/weapons.ts
```

---

## Chrome Extension 사용 방법

1. Chrome에서 `chrome://extensions`로 이동합니다.
2. 개발자 모드를 활성화합니다.
3. `압축해제된 확장 프로그램 로드`를 클릭합니다.
4. `chrome/ef-data-helper-extension` 폴더를 선택합니다.
5. Endfield 추천 팀 편성 페이지에 접속합니다.
6. 페이지에서 내 데이터 동기화를 진행합니다.
7. 확장 프로그램 팝업에서 `AIC-Assistant에 공유하기`를 클릭합니다.

확장 프로그램에서 사용하는 주요 주소는 `config.js`에서 관리합니다.

```js
const AIC_CONFIG = {
  FRONT_BASE_URL: "http://localhost:5173",
  API_BASE_URL: "http://localhost:8080",

  REC_TEAM_URL:
    "https://game.skport.com/tools/endfield/rec-team?header=0&ctr_orientation=landscape&routeId=0",

  SIGN_IN_URL:
    "https://game.skport.com/endfield/sign-in?header=0&hg_media=skport&hg_link_campaign=tools",
};
```

---

## 데이터 저장 기준

AIC-Assistant는 감지된 원본 데이터를 모두 저장하지 않고, 현재 서비스에서 사용하는 데이터만 저장합니다.

저장하는 데이터는 다음과 같습니다.

- `roleId`
- 캐릭터 ID
- 캐릭터 보유 여부
- 캐릭터 레벨
- 캐릭터 정예화 단계
- 무기 ID
- 무기 보유 여부
- 마지막 동기화 시간

저장하지 않는 데이터는 다음과 같습니다.

- 캐릭터 스킬 레벨 데이터
- 인증 관련 데이터
- 쿠키 및 토큰
- 요청 헤더 전체

초기에는 캐릭터별 스킬 레벨 데이터도 저장했지만, 유저 수가 늘어날수록 데이터가 빠르게 증가하고 현재 통계 기능에서 활용도가 낮다고 판단하여 저장 대상에서 제외했습니다.

---

## 구현 중 해결한 문제

### PathVariable 파라미터 인식 오류

조회 API 호출 시 다음 오류가 발생했습니다.

```text
Name for argument of type [java.lang.String] not specified
```

`@PathVariable("roleId")`처럼 파라미터 이름을 명시해 해결했습니다.

---

### JMX 포트 충돌

Spring Boot 실행 중 JMX 포트 충돌이 발생했습니다.

```text
Port already in use: 58994
```

기존 실행 프로세스를 종료하고, IDE 실행 대신 터미널에서 `./gradlew bootRun`으로 실행해 문제를 정리했습니다.

---

### 외부 이미지 로딩 실패

외부 이미지 URL을 사용할 때 이미지가 placeholder로 대체되는 문제가 있었습니다.

이미지 태그에 아래 옵션을 추가해 해결했습니다.

```tsx
<img referrerPolicy="no-referrer" />
```

---

### 메타데이터 수동 관리 문제

초기에는 캐릭터와 무기 정보를 수동으로 관리했습니다. 하지만 캐릭터와 무기가 늘어날수록 관리가 어려워져, 원본 JSON을 기반으로 TypeScript 메타데이터 파일을 자동 생성하도록 변경했습니다.

---

### 스킬 데이터 저장 비효율 문제

캐릭터별 스킬 레벨 데이터를 저장할 경우 유저 수가 증가할수록 데이터 양이 빠르게 커지는 문제가 있었습니다.

현재 서비스의 핵심 통계는 캐릭터 보유율, 무기 보유율, 정예화 단계, 레벨 분포이기 때문에 스킬 데이터는 저장하지 않는 방향으로 정리했습니다.

---

## 향후 개선 방향

- 백엔드 API 응답 구조 표준화
- 데이터 중복 공유 방지 처리 강화
- 사용자 수 증가에 대비한 통계 쿼리 최적화
- 배포 환경 구성
- README용 스크린샷 추가
- 포트폴리오 설명 자료 정리

---

## 프로젝트를 통해 다룬 내용

이 프로젝트를 진행하면서 다음 내용을 다뤘습니다.

- React 기반 SPA 구현
- TypeScript 데이터 모델링
- Spring Boot REST API 설계
- JPA 기반 데이터 저장 및 조회
- Oracle DB 연동
- Chrome Extension을 통한 웹 페이지 데이터 감지
- 외부 데이터 기반 메타데이터 자동 생성
- 통계 UI 및 상세 페이지 구현
- 프론트엔드와 백엔드 연동 디버깅
- 데이터 저장 범위 판단 및 DB 구조 개선

---

## 라이선스 및 주의사항

본 프로젝트는 개인 포트폴리오 및 학습 목적으로 제작되었습니다.

게임 데이터와 이미지 리소스의 권리는 각 원 저작권자에게 있습니다.

AIC-Assistant는 Arknights: Endfield, Hypergryph, GRYPHLINE과 공식적으로 관련이 없는 비공식 팬 메이드 서비스입니다.
