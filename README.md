# 📢 프로젝트 소개 (2023.05.12 ~ 2023.08.17)
<p width="100%">
 <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/0a695659-56be-445e-9a7d-ebb3ad47d3bf" width="20%">
</p>
- 영화 정보 및 관련 소식 제공과 함께 상영관 예매 서비스를 제공

## 🔗 담당기능
- **홈** (광고, 영화 TOP 10 , 최근 공지사항 및 영화 소식)
- **회원가입, 로그인**(+ 카카오 간편 로그인), **ID찾기 & 비밀번호 재설정**
    - 회원가입 ,아이디 찾기 (NCloud SMS API)
    - 비밀번호 재설정 ( Java Mail API )
    - 카카오 간편 로그인 (Kakao Login API)
- **마이페이지**(예매/취소내역, 회원정보수정)
- **결제진행** 및 **예매완료** ( NCloud SMS API)
- **관리자 모드** ( 광고 CRUD )
> 📌 **공통**
> - 사이트 와이어 프레임
> - DB 초안 작성
> - API 명세서 작성
> - 담당 페이지 Front-End, Back-End 
> - 담당 페이지별 관리자 모드


## 개발 도구 및 환경 
- **`JAVA 11`**
- **`Spring Boot 2.7.12`**, **`Mybatis 2.3.0`**, **`thymeleaf`**
- **`Kakao Maps API`**, **`Kakao Login API`**
- **`NCloud SMS API`**
- **`MariaDB 3.1.3`**
- **`Cloudflare`**, **`Google Cloud platform`**

## **협업 Tool**
- **`GitHub`** : 코드 공유
- **`Notion`** (팀 스페이스) : PJ 전반적인 진행 과정 및 회의 내용 

## UML & ERD  
![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5bc306ad-f021-45a8-b439-3c753384cd1d)

## 시스템 아키텍쳐
<p width="100%">
 <img src="" width="">
</p>

## API 명세서
<p width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5c050f64-d19b-4a9e-81a3-f7d51fa04ab9" width="300px" height="350px">
</p>

## 와이어프레임
### 홈(메인화면)
```
- 영화광고 포스터 : 유지 -> admin 관리할 수 있도록 구현
- TOP 10만 유지, 2줄로 보이기(예매율 기준)
 - 포스터 focus -> 영화정보, 예매하기 이동
 - 각 예매율 보이기
 - 각 영화별 예고편 보기 누르면 영상 팝업창 
- 공지사항 : 최근 5개 보기
- 영화소식 : 최근 2개 보기

```
<p align="center" width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/824df618-bb5d-43b5-bbf2-4f5885c88ea0" align="center" width="30%" title="메인화면" >
</p>

### 로그인/회원가입/ID 찾기 & PW 재설정
```
- 로그인 ( 로그인 여부 알려주기 : 불일치, 정지 )회원가입( 3단계로 구분)
    - 1단계 : 휴대폰 본인 인증
    - 2단계 : 서비스 이용약관/개인정보 수집 동의
    - 3단계 : 회원정보 ( 이메일 / 비밀번호 / 이름 / 생년월일 )
- 카카오 간편 로그인 ( 마이페이지 연동 시 가능하도록 구현)
- ID 찾기 ( 이름 , 생년월일 동일한 회원 확인 후  연락처 인증 후 제 )
- 비밀번호 재설정 ( 이메일 인증 -> 비밀번호 재설정 링크 연결 )
```
<p align="center" width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/9f616afa-836b-4931-9156-b8c73dfead4c" width="20%" title="로그인">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/7a2f7336-4b2e-4e1f-82f8-cfe85a4d2a7e"  width="20%" title="회원가입">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/122e4375-6f7c-44bc-bb66-251b267ed4ca"  width="20%" title="아이디찾기">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/e993c0da-b800-43bd-ae93-71cd99d6dbd4"  width="20%" title="비밀번호재설정">
</p>

### 마이페이지
```
- 예매내역(관람 가능 내역) / 취소내역(최근 1개월 이내)
- 회원정보수정 
 - 본인 검증 후 개인정보수정 이동
 - 연락처 변경 시 인증 후 가능하도록
 - 카카오 간편 로그인 계정 연결 
```
<p align="center" width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/c572122a-ca06-4d99-b378-14a680e423bb" align="center" width="30%" title="마이페이지-예매/취소내역">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/8995b3bf-89f9-400f-9c47-c6d8e811fc5f" align="center" width="30%" title="본인확인">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/6372dc42-c849-454b-b4b8-2da6a8a9037c" align="center" width="30%" title="마이페이지-정보수정">
</p>

### 결제/예매완료(실제 결제x) 
```
- 결제하기(카드결제시 다음으로 넘어가도록)
 - 카드 앞6자리 번호와 DB에 저장된 카드사별 지정번호 일치여부 확인 후 결제완료
- 예매완료시 문자전송
```
<p align="center width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/c1c75253-bba5-4a3b-8fca-8e0a0d95b336" width="30%" align="center" title="결제선택">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/e98c2f3d-5d64-4807-aac8-f23cd8fa1410" width="30%" align="center" title="카드정보입력">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/789fbbca-0a3a-4dcf-985d-91b255f13c95" width="30%" align="center" title="결제및예매완료">
</p>

```
- 카드결제 (카드번호 앞 6자리, 카드회사 사용가능여부 확인 후 결제 진행)
```
   <p width="100%">
    <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/86bed0a2-411a-4ed1-b5ad-c0b2eb8f3140" width="70%" height="250">
   </p>

## 개발 
### 암호화 Util (비밀번호 및 카드번호)
<p width="100%">
 <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/d5c37c4e-21dd-4bac-8951-5edcf5bb830f" width="40%">
</p>


### 정규화 (회원정보 및 카드정보)
![Regex](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/50939c5a-beaf-42b9-baac-5940dd9e5a6f)
<p width="100%">
 <img src="" width="">
</p>

### 네이버 SMS API 연동 (인증번호 전송:회원가입 & ID 찾기, 예매완료 전송)
<p width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5654ba94-546a-4231-ab8e-b5fb6532320d" width="40%" title="인증키생성">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/a690237f-cd84-4a44-84be-3f407ff343bd" width="40%" title="SMS API">
</p>

### 카카오 간편 로그인 
- 회원가입 후 개인정보수정에서 카카오 간편 로그인 연결 및 해제 가능
  #### 연결
  <p width="100%">
   <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/3a88e130-0303-4a7d-9ffc-691a5b0b43fe" width="45%" height="250" alt="연결">
   <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/e089c3ad-f861-4d13-bb53-3a3246a5284e" width="45%" height="250" alt="연결알람">
  </p>
  
  #### 해제
  <p width="100%">
   <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/08ea2eb5-7540-4cd6-984e-5a82dcc0975e" width="45%" height="250" alt="해제">
   <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/ffdd95e8-077d-4ada-9def-f3481ae3e864" width="45%" height="250" alt="연결해제">
  </p>
  
- 카카오 미연동상태에서 카카오 로그인 시도
  <p width="100%">
   <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/cda301c7-f20d-4630-bf92-3187f5db950a" width="45%" height="250">
  </p>

## 도메인 , 서버, 배포
### 도메인 구매 (가이아, moviesq.herrykim.com)
###  DNS (Cloudflare)
### 서버 구축 및 배포 (GCP,Google Cloud Platform)

## 🚨 오류 수정 및 리팩토링

1️⃣ **문제점 : 동일한 날짜의 영화 스케쥴 1개만 보임**
- **파악**
    - 모든 예매 스케쥴  1개만 보임 → 동일한 영화,상영관,날짜 다른 시간의 스케쥴 2개 추가 후 다시  확인하였으나 1개만 보이는 상황 발견
- **해결방안:** SQL 쿼리 수정 (Group by 잘못된 설정)
    - **처음**
    
    ```sql
    SELECT `A`.`index`                             AS `scheduleIndex`,
    					CONCAT(DATE_FORMAT(`A`.`time_start`, '%H:%i'), '~',
    	                      DATE_FORMAT(`A`.`time_end`, '%H:%i'))     AS 'runningTime',
    					`B`.`name`                           AS `screenName`,
    					`B`.`seat_total`                     AS `seatTotal`,
    					COUNT(`E`.`schedule_index`)          AS `occupiedSeatTotal`
    FROM `movie_sq`.`screen_schedules` AS `A`
    			LEFT JOIN `movie_sq`.`screens` AS `B` ON `A`.`screen_index` = `B`.`index`
    			LEFT JOIN `movie_sq`.`movies` AS `C` ON `A`.`movie_index` = `C`.`index`
    			LEFT JOIN `movie_sq`.`theaters` AS `D` ON `A`.`theater_index` = `D`.`index`
    			LEFT JOIN `movie_sq`.`reservation_status` AS `E` ON `A`.`index` = `E`.`schedule_index`
    WHERE `D`.`name` = #{theaterName} &&
    			`C`.`title_ko` = #{movieName} &&
    			DATE_FORMAT(`A`.`time_start`, '%Y-%m-%d') = #{timeName} &&
    			`A`.`time_start` > NOW()
    GROUP BY `E`.`schedule_index`;**
    ```
    
    - **수정**
    
    ```sql
     --동일함
    GROUP BY  A.`index`, `runningTime`, `screenName`, `seatTotal`;**
    ```    
   
  <p width="100%">
 <img src="" width="">
</p>



2️⃣ **문제점 : 회원가입 없이 카카오 간편 로그인 진행 어려움**
> - DB User의 contact column NOT NULL 설정
> - User 테이블의 contact 칼럼과  contact_code 테이블의 contact 칼럼과 FK 설정    
>    → 사용자의 연락처 인증, 연락처 정보 없이 회원등록 불가능!   
> - 그러나 카카오 개발 모드에서 사용자 연락처 정보를 가져올 수 없음
- **파악**
    - 카카오 로그인  → 회원 기본 정보 가져온 후 User table 데이터 insert하려고 시도했으나 오류 발생
- **해결방안 : 회원이 카카오 로그인 연동 시 가능하도록 기획변경**
    - User 테이블에 kakao_email 칼럼, kakao_linked_flag 칼럼 추가
    - 첫 연동시 kakao_eamil 칼럼에 정보 추가 및 kakao_linked_flag true 변경
    - 연결 해제시 kakao_linked flag false 변경
    - 각 상황에 따른 popUp 보여주도록 설정

3️⃣ **문제점 : 영화예매 번호 랜덤 생성 → 번호 중복 가능성 확인**
- **파악**
    - 코드 재확인 과정에서 사용자가 많으면 중복될 수 도 있지 않을까 하는 생각을 함
    - 다음의 코드를 통해 중복 가능성 확인   
   <p width="100%">
    <img src="" width="">
   </p>

- **해결방안 : 번호 중복 확인하는 메서드 추가**
    - do-while문 사용하여 예매번호 생성 후 중복 여부 확인
    - 중복 없으면 그대로 사용
    - 중복 있으면 번호 다시 생성
   
    ```java
    public String generateTicketNumber() {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            String current = sdf.format(new Date());
            String ticketNumber;
            do {
                ticketNumber = String.format("%s%s", current, RandomStringUtils.randomNumeric(8));
            } while (this.getInformationByTicketNumber(ticketNumber).get("ticketNumber") != null);
            return ticketNumber;
    	    }
    ```

4️⃣ **문제점 : 홈 로딩 지연**
- **해결방안 1**
    - 광고 화면 부트스트랩 캐러셀 형식 활용        
        → 부트스트랩에서 제공하는 요소에 대한 설정된 속성에 대한 분석과 이해
    - **`thymeleaf:each`** 의 count, index속성, **`thymeleaf:attr`** 활용
- **해결방안 2**
    - 기존 : TOP10 예고편 팝업 10개 모두 가져오기
    - 변경 : 팝업 1개에 호출 시 해당 예고편의 src 불러오는 방식으로 변경
- **결과**
    - **변경 전**
      <p width="100%">
       <img src="" width="">
      </p>
    - **변경 후**
      <p width="100%">
       <img src="" width="">
      </p>
      
        -> **DOMContentLoaded**: 4.45s -> 3.45s 약 22% 감소
        -> **Load** : 22.40s → 5.33 약 76% 감소
    
