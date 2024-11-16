# 🥣 푸딧(Food-Eat) - 청소년을 위한 식습관 관리 시스템

# 👤 담당 역할 - 프론트엔드

### 1. 프론트엔드 개발
- **백엔드 API 연동**
  - RESTful API 연동 및 에러 처리
  - 이미지 업로드 및 분석 API 통합
  - API 응답 데이터 가공 및 상태 관리

- **반응형 UI/UX 구현**
  - 모바일, 태블릿, 데스크톱 대응 반응형 디자인
  - Tailwind CSS를 활용한 효율적인 스타일링
  - 사용자 친화적인 인터페이스 설계

- **상태 관리**
  - Zustand를 활용한 전역 상태 관리
  - 사용자 인증 상태 관리
  - 식단 데이터 상태 관리

- **컴포넌트 설계**
  - 재사용 가능한 컴포넌트 설계
  - 영양소 분석 차트 구현
  - 이미지 업로드 및 미리보기 기능 구현

## 📚 기술 스택

### Frontend
- **Framework:** Next.js 15 (App Router)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **API Client:** Axios
- **Form Handling:** React Hook Form
- **UI Components:** react-icons
- **Authentication:** NextAuth.js

### Infrastructure
- **Deployment:** Vercel
- **Version Control:** Git, GitHub, linear, Notion

### Mocks API
- MSW (Mock Service Worker)

## 🔨 주요 기능

1. 🍽️ **AI 기반 식단 분석**
   - 음식 사진 업로드를 통한 자동 영양소 분석
   - 실시간 칼로리 및 영양소 정보 제공
   - 직관적인 영양소 분포 차트 제공

2. 📊 **영양소 상세 분석**
   - 탄수화물, 단백질, 지방 등 주요 영양소 분석
   - 비타민 A, B, C 함량 분석
   - 칼륨, 나트륨, 콜레스테롤 등 미네랄 정보 제공

3. 📱 **반응형 디자인**
   - 모바일, 태블릿, 데스크톱 등 다양한 디바이스 지원
   - 직관적인 UI/UX 제공


## 🌐 프로젝트 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂blog
 ┃ ┃ ┣ 📂category
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂[category]
 ┃ ┃ ┃ ┗ 📂[slug]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📜CategoryList.tsx
 ┃ ┃ ┃ ┣ 📜PostGrid.tsx
 ┃ ┃ ┃ ┗ 📜PostPagination.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂board
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂content
 ┃ ┃ ┣ 📂activities
 ┃ ┃ ┃ ┣ 📜ac-1.mdx
 ┃ ┃ ┃ ┗ 📜ac-2.mdx
 ┃ ┃ ┣ 📂Algorithm
 ┃ ┃ ┃ ┣ 📜a-1.mdx
 ┃ ┃ ┃ ┣ 📜a-2.mdx
 ┃ ┃ ┃ ┣ 📜a-3.mdx
 ┃ ┃ ┃ ┗ 📜a-4.mdx
 ┃ ┃ ┣ 📂javascript
 ┃ ┃ ┃ ┗ 📜j-1.mdx
 ┃ ┃ ┣ 📂network
 ┃ ┃ ┃ ┣ 📜nw-1.mdx
 ┃ ┃ ┃ ┣ 📜nw-2.mdx
 ┃ ┃ ┃ ┗ 📜nw-3.mdx
 ┃ ┃ ┣ 📂next.js
 ┃ ┃ ┃ ┣ 📜n-1.mdx
 ┃ ┃ ┃ ┣ 📜n-2.mdx
 ┃ ┃ ┃ ┗ 📜n-3.mdx
 ┃ ┃ ┗ 📂react
 ┃ ┃ ┃ ┣ 📜r-1.mdx
 ┃ ┃ ┃ ┣ 📜r-2.mdx
 ┃ ┃ ┃ ┣ 📜r-3.mdx
 ┃ ┃ ┃ ┣ 📜r-4.mdx
 ┃ ┃ ┃ ┗ 📜r-5.mdx
 ┃ ┣ 📂portfolio
 ┃ ┃ ┣ 📜data.ts
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜handleTransition.ts
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜loading.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂navbar
 ┃ ┃ ┣ 📜BackBtn.tsx
 ┃ ┃ ┣ 📜DarkModeBtn.tsx
 ┃ ┃ ┣ 📜Navbar.tsx
 ┃ ┃ ┗ 📜NavTitle.tsx
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜aurora-background.tsx
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜dropdown-menu.tsx
 ┃ ┃ ┣ 📜pagination.tsx
 ┃ ┃ ┣ 📜shooting-stars.tsx
 ┃ ┃ ┗ 📜stars-background.tsx
 ┃ ┣ 📜CustomLink.tsx
 ┃ ┣ 📜Giscus.tsx
 ┃ ┣ 📜PostCard.tsx
 ┃ ┗ 📜theme-provider.tsx
 ┗ 📂lib
 ┃ ┣ 📂mdx
 ┃ ┃ ┗ 📜getBlog.tsx
 ┃ ┣ 📜postCache.ts
 ┃ ┗ 📜utils.ts

```

***


# 🥣 푸딧 - 청소년을 위한 식습관 관리 시스템
<p align="center">
    <img src="https://github.com/user-attachments/assets/bf23861a-d570-40e0-bc69-c648e253357b" alt="Image 1" width="300">
    <img src="https://github.com/user-attachments/assets/31708c10-11c6-47ac-8875-0ec2ca3e21a6" alt="Image 2" width="300">
  
</p>
<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Spring-6DB33F?logo=spring&logoColor=white" alt="Spring">
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Good%20Health%20And%20Well-Being-28B463?style=flat&logo=health&logoColor=white" alt="Good Health And Well-Being">
</p>
<div align="center">
  <a href="https://foods-eat.vercel.app/">푸딧 홈페이지 바로가기</a>
</div>


# 🔗 프로젝트 Github 주소
- **Backend:** [https://github.com/Vision-Challengethon-TEAM-1/BackEnd/](https://github.com/Vision-Challengethon-TEAM-1/BackEnd/)
- **Frontend:** [https://github.com/Vision-Challengethon-TEAM-1/Frontend/](https://github.com/Vision-Challengethon-TEAM-1/Frontend/)


# 📢 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/adorableco"><img src="https://github.com/user-attachments/assets/e3bd0a3e-c211-4e13-9d9d-fceb604e5a03" width="100px;" alt="박세연"/><br /><sub><b>박세연 👋<br>백엔드<br>(컴퓨터학부 심컴 21학번)</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/eunwoo-levi"><img src="https://github.com/user-attachments/assets/69ebf619-6fb0-4a98-bd68-e41aaba98fab" width="100px;" alt="성은우"/><br /><sub><b>성은우 👋<br>웹 프론트엔드<br>(컴퓨터학부 글솦 22학번)</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/lsmin3388"><img src="https://github.com/user-attachments/assets/ce739ae9-f8d4-40c0-bece-d75d819925af" width="100px;" alt="이상민"/><br /><sub><b>이상민 👋<br>백엔드<br>(컴퓨터학부 심컴 23학번)</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/ChangmokLee"><img src="https://github.com/user-attachments/assets/a8ac042d-8629-4530-8a8a-ae70216c3817" width="100px;" alt="이창목"/><br /><sub><b>이창목 👋<br>웹 프론트엔드<br>(컴퓨터학부 글솦 20학번)</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/hayeonyum"><img src="https://github.com/user-attachments/assets/38f6aac9-3e39-4f1a-aadb-a2d911efa866" width="100px;" alt="전하연"/><br /><sub><b>전하연 👋<br>디자인<br>(예술대학 디자인학과 21학번)</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

# 📢 서비스 소개

## 📍 서비스 개요

**푸딧**은 `food`와 `eat`의 합성어로, 청소년을 위한 **식습관 관리 시스템**입니다. 학교와 학원 등에서 주로 시간을 보내는 청소년들의 특성을 고려하여, 운동보다는 건강한 식습관 형성에 중점을 두고 개발되었습니다.

## 📍 주요 기능

- **AI 기반 식단 기록**
- **학교 급식 연동 시스템**
- **건강한 식습관 경쟁 기능**
- **스티커 기능**
- **주간, 월간 기능**

## 📍 청소년에게 필요한 이유

### 1. 부적절한 체중 관리의 위험성

소아청소년기는 키 성장과 2차 성징 발달이 이루어지는 중요한 시기입니다. 이 시기에 형성된 식습관은 성인이 된 후에도 지속적인 영향을 미치기 때문에, **바른 식습관 형성**이 매우 중요합니다. 부적절한 체중 관리는 다음과 같은 건강 문제를 초래할 수 있습니다:

- **신체 건강 문제:** 빈혈, 생리불순, 골다공증 등
- **정신 건강 문제:** 우울증, 거식증, 폭식증 등

### 2. 소아청소년 비만 현황 및 해결 필요성

![소아청소년 비만 현황](https://github.com/user-attachments/assets/60cf3b83-41fd-4dfe-b36f-6ee2c32556ce)

2023년 대한비만학회에서 발간된 비만 팩트 시트에 따르면, 최근 10년간 소아청소년 비만 유병률이 급격히 증가하고 있습니다.

- **비만 유병률 증가:**
  - 남아: 10.4% → 25.9% (약 2.5배 증가)
  - 여아: 8.8% → 12.3% (약 1.4배 증가)

소아청소년 비만은 만성 질환으로, 일생 전반에 걸쳐 건강한 식생활과 올바른 생활 양식이 필요하지만 치료가 쉽지 않습니다. 따라서, 소아청소년 비만 관리는 개인의 건강뿐만 아니라 국가적인 중대한 사안으로 대두되고 있습니다.

## 📍 기능 상세 설명

### [AI 기반 식단 기록 시스템]

<p align="center">
  <img src="https://github.com/user-attachments/assets/72df9b54-f407-4a15-9912-4df15980f6f2" alt="메인 홈" width="30%">
  <img src="https://github.com/user-attachments/assets/e8a74e3a-f816-4089-8218-3eb7a57b0a5a" alt="식사 기록하기" width="30%">
</p>
기존의 식단 기록 서비스는 사용자가 음식을 하나하나 검색하고, 그램 수를 설정하는 등 번거로운 단계를 거칩니다. **푸딧**은 AI의 도움을 받아 사용자가 음식의 사진을 한 번 찍기만 하면 자동으로 메뉴와 그램 수를 측정하여 바로 기록할 수 있습니다. 이를 통해 청소년들이 느낄 수 있는 귀찮음과 지루함을 크게 줄였습니다.


### [학교 급식 연동 시스템]

청소년들은 주로 학교에서 시간을 보내기 때문에, **푸딧**은 학교 급식과 연동하여 사용자가 휴대폰을 사용하지 않아도 자동으로 식단이 기록되도록 시스템을 구축하였습니다. 이는 사용자 편의성을 극대화합니다.

### [친구와 함께하는 경쟁 시스템]

<p align="center">
  <img src="https://github.com/user-attachments/assets/f1d8158c-e6f3-49e9-9ef5-fb28a735e5d7" alt="함께하기 그룹 찾기" width="25%">
  <img src="https://github.com/user-attachments/assets/fe1976f7-2c4e-41d6-8af5-dabd56e3f11b" alt="함께하기 생성" width="25%">
  <img src="https://github.com/user-attachments/assets/fed782c4-70f9-44ec-9621-a252e5df678b" alt="함께하기 1" width="25%">
</p>
푸딧은 단순히 식단을 기록하는 것을 넘어, 친구들과 식습관을 공유하고 **식습관 점수**를 통해 경쟁할 수 있는 기능을 제공합니다. 이를 통해 사용자들은 비슷한 환경에서 적합한 식단 정보를 얻고, 건강한 식습관 형성에 동기를 부여받을 수 있습니다.



### [스티커 기능]

사용자는 매일 자신이 기록한 식단에 대해 점수를 받을 수 있으며, **80점 이상**을 달성할 때마다 랜덤 과일 스티커를 부여받습니다. 스티커는 주간 달력이나 친구와의 경쟁에서 자신만의 푸딧을 완성하는 데 사용됩니다.


### [주간, 월간 기능]

<p align="center">
  <img src="https://github.com/user-attachments/assets/b83f467a-4431-40af-a275-86a8c19a3ce8" alt="달력 일간" width="25%">
  <img src="https://github.com/user-attachments/assets/0d3738b3-a1e0-45ec-96f2-e33fd166297b" alt="달력 주간-1" width="25%">
  <img src="https://github.com/user-attachments/assets/079d8730-557d-4433-b988-172705566fc2" alt="달력 주간" width="25%">
</p>

- **일간:** 받은 스티커를 하나씩 확인할 수 있습니다.
- **주간:** 받은 스티커로 주간 푸딧이 완성됩니다.
- **월간:** 주간에 완성된 푸딧이 랜덤으로 해당 월 푸딧으로 등장하여, 장기적인 식습관을 한눈에 확인할 수 있습니다.



# 📊 시스템 설계

## ERD

![비전 챌린지톤 - 천리안 (1)](https://github.com/user-attachments/assets/eaec3708-3ac4-435b-acbb-23846caae7b4)


## 시스템 아키텍처

![스크린샷 2024-11-16 오전 5 38 04 1 (1)](https://github.com/user-attachments/assets/ba093d52-e48a-41c3-8e9b-82dbaef1c0e0)


## UI/UX

<img width="722" alt="스크린샷 2024-11-16 오전 5 40 44" src="https://github.com/user-attachments/assets/b7907131-2c29-4303-848e-79ba9fd11fc3">

# 🔧 이슈 관리 방식

푸딧 프로젝트는 효율적인 협업과 문제 해결을 위해 다음과 같은 이슈 관리 방식을 채택하고 있습니다:

1. **GitHub Issues 및 Linear 사용:**
   - 모든 버그, 기능 요청, 개선 사항은 GitHub Issues와 Linear 툴을 통해 관리합니다.
   - `Fix`, `Feature` 등의 이슈 템플릿은 Linear에서 제공되며, 이를 통해 일관된 이슈 관리가 가능합니다.

    <img width="1489" alt="스크린샷 2024-11-16 오전 5 37 08" src="https://github.com/user-attachments/assets/91ade32e-bbaf-4062-b5e3-c66298d849b7">

2. **프로젝트 보드 및 작업 흐름:**
   - GitHub Projects와 Linear를 연동하여 `To Do`, `In Progress`, `Done` 칼럼으로 작업을 관리합니다.
   - 스프린트 단위로 계획을 세우고, 작업의 진행 상황을 시각적으로 추적합니다.

3. **코드 리뷰:**
   - 모든 Pull Request(PR)는 최소 한 명 이상의 팀원에 의해 코드 리뷰를 거칩니다.
   - 코드 품질과 일관성을 유지하기 위해 리뷰어는 피드백을 제공하고 필요 시 수정 요청을 합니다.

4. **정기 회의:**
   - 주간 회의를 통해 진행 상황을 공유하고, 발생한 이슈를 논의합니다.
   - 회의록은 Notion에 기록하여 팀원 모두가 접근할 수 있도록 합니다.

5. **자동화 및 CI/CD 파이프라인:**
   - GitHub Actions를 활용하여 CI/CD 파이프라인을 구축하였습니다.
   - 테스트, 빌드, 배포 과정이 자동화되어 코드 퀄리티를 유지하고 배포 시간을 단축합니다.


# 📍 참고 자료

- [대한비만학회 비만 팩트 시트](https://jkma.org/journal/view.php?doi=10.5124/jkma.2024.67.5.306#f1-jkma-2024-67-5-306)
- [비만 유병률 증가](https://www.kdca.go.kr/board/board.es?mid=a20501000000&bid=0015&list_no=722017&cg_code=&act=view&nPage=4&newsField=202303)

# 📍 기여 및 연락처

푸딧 프로젝트에 기여하고 싶으신 분들은 [이메일](mailto:sjsb4838@gmail.com)로 연락주시기 바랍니다.

---

**푸딧**과 함께 건강한 식습관을 만들어가세요! 🥗🍎

# 프로젝트 배너

![화면(시험용)](https://github.com/user-attachments/assets/7a00e9b3-9d5c-42bd-b2f0-78fe207d903c)


# 기술 스택

- **Frontend:** React, Next, Zustand, Tailwind
- **Backend:** Spring, Mysql
- **CI/CD:** GitHub Actions, Docker
- **디자인:** Figma
