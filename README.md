# AIC-Assistant

**AIC-Assistant**는 명일방주: 엔드필드(Arknights: Endfield) 유저 데이터를 수집하고, 캐릭터 및 무기 보유 현황을 통계로 시각화하는 웹 서비스입니다.

브라우저 확장 프로그램을 통해 사용자의 게임 데이터를 감지하고, Spring Boot 백엔드에 저장한 뒤 React 프론트엔드에서 개인 데이터와 전체 통계를 확인할 수 있습니다.

---

## 프로젝트 개요

게임사에서 공식적으로 제공하지 않는 유저 보유 데이터 기반 통계를 직접 수집하고 분석하기 위해 제작한 프로젝트입니다.

사용자는 크롬 확장 프로그램을 통해 추천 팀 편성 페이지에서 감지된 데이터를 AIC-Assistant
서버로 공유할 수 있습니다. 공유된 데이터는 통계 페이지에서 캐릭터 보유율, 무기 보유율, 정예화 단계 분포, 레벨 구간 분포 등으로 시각화됩니다.

---

## 주요 기능

### 1. 크롬 확장 프로그램을 통한 데이터 감지

- Endfield 추천 팀 편성 페이지에서 `user-game-data` 감지
- 감지된 데이터에서 필요한 정보만 추출
- 쿠키, 토큰, 로그인 정보, 요청 헤더 전체는 저장하지 않음
- 사용자가 직접 공유 버튼을 눌렀을 때만 서버로 전송

### 2. 개인 데이터 조회

- 특정 `roleId` 기준 개인 보유 캐릭터 조회
- 보유 무기 조회
- 마지막 동기화 시간 확인
- 캐릭터 레벨 및 정예화 단계 표시

### 3. 전체 통계 페이지

- 공유된 유저 데이터 기준 통계 제공
- 캐릭터 보유율 조회
- 무기 보유율 조회
- 캐릭터/무기 탭 분리
- 전체/보유 데이터 필터
- 이름 검색
- 필터 드롭다운 제공

### 4. 캐릭터 필터

- 성급
- 속성
- 직업군
- 사용 무기
- 보유 여부
- 이름 검색

### 5. 무기 필터

- 성급
- 무기 타입
- 보유 여부
- 이름 검색

### 6. 상세 페이지

#### 캐릭터 상세 페이지

- 캐릭터 이미지
- 성급, 속성, 직업군, 사용 무기
- 보유율
- 보유 인원 / 전체 유저 수
- 정예화 단계 분포
- 주요 레벨 구간 분포

#### 무기 상세 페이지

- 무기 이미지
- 성급, 무기 타입
- 보유율
- 보유 인원 / 전체 유저 수
- 무기 설명
- 스킬 정보

### 7. 메타데이터 자동 생성

- `search-chars.json`
- `search-weapons.json`

위 원본 JSON 데이터를 기반으로 캐릭터/무기 메타데이터 TypeScript 파일 자동 생성

생성되는 파일:

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

### Database

- Oracle XE

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
│  └─ build.gradle
│
├─ front/
│  ├─ public/
│  ├─ scripts/
│  │  └─ generate-endfield-meta.mjs
│  ├─ src/
│  │  ├─ api/
│  │  ├─ assets/
│  │  ├─ data/
│  │  │  ├─ raw/
│  │  │  │  ├─ search-chars.json
│  │  │  │  └─ search-weapons.json
│  │  │  ├─ operators.ts
│  │  │  └─ weapons.ts
│  │  ├─ pages/
│  │  ├─ styles/
│  │  ├─ App.tsx
│  │  └─ main.tsx
│  └─ package.json
│
└─ chrome/
   └─ ef-data-helper-extension/
      ├─ manifest.json
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

전송 데이터 예시:

```json
{
  "roleId": "4013416473",
  "userChars": [],
  "userWeapons": [],
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

레벨 분포 기준:

| 구간  | 기준            |
| ----- | --------------- |
| `60+` | 60 이상 80 미만 |
| `80+` | 80 이상 90 미만 |
| `90`  | 90              |

---

## 실행 방법

### Backend 실행

```bash
cd back
./gradlew bootRun
```

Windows PowerShell:

```powershell
cd back
.\gradlew bootRun
```

기본 실행 주소:

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

기본 실행 주소:

```text
http://localhost:5173
```

---

### 메타데이터 생성

`front/src/data/raw/` 폴더에 아래 파일을 저장합니다.

```text
search-chars.json
search-weapons.json
```

그 후 실행합니다.

```bash
cd front
node scripts/generate-endfield-meta.mjs
```

생성 결과:

```text
src/data/operators.ts
src/data/weapons.ts
```

---

### Chrome Extension 로드

1. Chrome에서 `chrome://extensions` 접속
2. 개발자 모드 활성화
3. `압축해제된 확장 프로그램 로드` 클릭
4. `chrome/ef-data-helper-extension` 폴더 선택
5. 추천 팀 편성 페이지 접속
6. 내 데이터 동기화 ON
7. 확장 프로그램 팝업에서 `AIC-Assistant
에 공유하기` 클릭

---

## 데이터 수집 정책

AIC-Assistant
Helper는 다음 정보만 전송합니다.

- `roleId`
- 캐릭터 보유 데이터
- 무기 보유 데이터
- 감지 시간

다음 정보는 전송하지 않습니다.

- 쿠키
- 토큰
- 로그인 정보
- 요청 헤더 전체
- sign, cred 등 인증 관련 값

---

## 구현 중 겪은 주요 문제와 해결

### 1. Spring PathVariable 파라미터 인식 오류

조회 API 호출 시 다음 오류가 발생했습니다.

```text
Name for argument of type [java.lang.String] not specified
```

해결 방법:

- `@PathVariable("roleId")`처럼 파라미터 이름을 명시
- 또는 컴파일 옵션에 `-parameters` 추가

---

### 2. JMX 포트 충돌

Spring Boot 실행 중 다음 오류가 발생했습니다.

```text
Port already in use: 58994
```

해결 방법:

- 기존 실행 프로세스 종료
- IDE 실행 세션 정리
- 포트 충돌 후 재실행

---

### 3. 외부 이미지 로딩 실패

외부 이미지 URL을 사용했을 때 이미지가 로딩되지 않고 placeholder로 대체되는 문제가 있었습니다.

해결 방법:

```tsx
<img referrerPolicy="no-referrer" />
```

`referrerPolicy="no-referrer"`를 추가하여 이미지 요청이 정상적으로 처리되도록 수정했습니다.

---

### 4. 캐릭터/무기 메타데이터 수동 관리 문제

초기에는 캐릭터 이름과 이미지 경로를 수동 매핑했습니다. 이후 `search-chars`, `search-weapons` API 응답 JSON을 기반으로 TypeScript 메타데이터 파일을 자동 생성하도록 개선했습니다.

---

## 향후 개선 예정

- 통계 정렬 기능 추가
  - 보유율 높은 순
  - 보유율 낮은 순
  - 이름순
  - 성급순

- 개인 데이터 페이지 UI 정리
- 배포 환경 주소 분리
- 백엔드 API 응답 구조 표준화
- 무기 상세 페이지 정보 보강
- 캐릭터 상세 페이지 태그 표시
- 데이터 중복 공유 방지 처리
- 사용자 수 증가 시 통계 쿼리 최적화

---

## 프로젝트 목적

이 프로젝트는 단순한 CRUD 서비스가 아니라, 실제 게임 웹 페이지에서 데이터를 감지하고, 필요한 데이터만 추출해 서버에 저장한 뒤, 통계 페이지로 시각화하는 전체 흐름을 구현하는 것을 목표로 했습니다.

이를 통해 다음 역량을 확인할 수 있습니다.

- React 기반 SPA 구현
- TypeScript 데이터 모델링
- Spring Boot REST API 설계
- JPA 기반 데이터 저장 및 조회
- Oracle DB 연동
- Chrome Extension 데이터 감지
- 외부 데이터 기반 메타데이터 자동 생성
- 통계 UI 및 상세 페이지 구현
- 프론트엔드와 백엔드 연동 디버깅

---

## 라이선스 및 주의사항

본 프로젝트는 개인 포트폴리오 및 학습 목적으로 제작되었습니다.

게임 데이터 및 이미지 리소스의 권리는 각 원 저작권자에게 있으며, 본 프로젝트는 비공식 팬 메이드 통계 서비스입니다.
