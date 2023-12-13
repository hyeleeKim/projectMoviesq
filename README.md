# 프로젝트 소개 (2023.05.12 ~ 2023.08.17)
- 영화예매

## 팀원 및 담당기능 (4명)
 - 오경아 (팀장) : 영화 목록, 상세 정보, 고객지원(공지사항, FAQ, 소식), DB 및 API 취합,
                  마이페이지(관람내역), 프로젝트 관리
 - <b>김혜리 (팀원) : 홈(광고, 영화 순위, 공지사항), 회원가입, 로그인(카카오 로그인)
                   계정찾기, 마이페이지(예매/취소내역, 회원정보수정), 결제 및 예매완료</b>
 - 박도현 (팀원) : 동적 상영 시간표, 영화 선택, 상영관 선택, 좌석 선택
 - 이상민 (팀원) : 지역별 극장 목록, 극장 검색, 극장 정보(Kakaomaps API)
> 공통
> - 사이트 와이어 프레임
> - DB 초안 작성
> - API 명세서 작성
> - 담당 페이지 HTML/CSS/JS, Back-End
> - 담당 페이지별 관리자 모드

## 목표
> 습득한 내용의 활용
> 팀원간 창의적 디지털 협업
> 개발 프로세스의 이해
> 효율적인 커뮤니케이션 

## 개발 도구 및 환경 
- HTML5/Javascript5/css3   ![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5be09c54-5406-43c3-ba57-8b0d0e527480)
- JAVA 11 ![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5314580a-eaa8-42ac-8345-3756384aafce)
- IntelliJ   ![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/ace8628c-584a-4df8-be27-01d5753d4345)
- Spring Boot 2.7.12 ![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/49b5ae87-d8c4-4d03-bc65-351295d90b27)
- MyBatis 2.3.0 ![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/d0deee0a-9cd9-4974-b34e-750c31ce780d)
- Tomcat
- Maven 4.0.0
- MariaDB 3.1.3 ![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/ea1271dd-d59d-47cb-a7be-b1bca7dacfa6)
- NCloud SMS API
- Java Mail API
- Kakao Maps API
- CKEditor

# 프로젝트 진행 
## 1. 요구사항 정리
```
이메일 인증/전화번호 인증, 아이디 찾기, 비밀번호 재설정 - 회원가입, 로그인
게시판, 페이징 - 공지사항 또는 FAQ
지도 API - 극장 정보 페이지
```

## 2. UML 
![image](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5bc306ad-f021-45a8-b439-3c753384cd1d)


## 3. 와이어프레임
### 홈(메인화면)
```
- TOP 10만 유지, 2줄로 보이기(예매율 기준)
- 영화소식 : 일단 제외 -> 다시 진행 : 메인화면 빈 느낌
- 영화광고 포스터 : 유지
```
<p align="center" width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/824df618-bb5d-43b5-bbf2-4f5885c88ea0" align="center" width="30%" title="메인화면" >
</p>

### 로그인/회원가입/ID 찾기 & PW 재설정
```
- 로그인 ( 로그인 여부 알려주기 : 불일치, 정지 )
- 회원가입( 3단계로 구분)
  1. 첫번째 단계 : 휴대폰 본인 인증
  2. 두번쨰 단계 : 서비스 이용약관/개인정보 수집 동의
  3. 세번째 단계 : 회원정보 ( 이메일 / 비밀번호 / 생년월일 ) 
- ID 찾기 ( 생년월일,연락처 인증 )
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
- 예매내역(관람 가능)/취소내역(최근 1개월 이내)
- 회원정보수정 (본인확인 -> 정보수정)
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

## 4. DB설계 (ERD)
### 초안
<p width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/e1399d7f-b6e6-49d3-b644-2a996e4ab032" width="40%" align="center" title="1안">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/c5d3bd8d-94ea-4ab5-be5b-66bf53579035" width="40%" align="center" title="2안">
</p>

### 완성본
<p>
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/d8219a22-cc83-4eaf-84f6-893714a87373" width="50%" align="" title="완성본">
</p>

### 쿼리
- 예매율 TOP 10 보이기
```
SELECT (SUM(`reserve`.`ticket_total`) / SUM(`screen`.`seat_total`)) * 100 AS `reservationRate`,
       `movie`.`index`                                                    AS `index`,
       `movie`.`title_ko`                                                 AS `titleKo`,
       `movie`.`title_en`                                                 AS `titleEn`,
       `movie`.`rating`                                                   AS `rating`,
       `movie`.`release_date`                                             AS `releaseDate`,
       `movie`.`genre`                                                    AS `genre`,
       `movie`.`running_time`                                             AS `runningTime`,
       `movie`.`synopsis`                                                 AS `synopsis`,
       `movie`.`director`                                                 AS `director`,
       `movie`.`cast`                                                     AS `cast`,
       `movie`.`agency`                                                   AS `agency`,
       `movie`.`trailer_url`                                              AS `trailerUrl`,
       `movie`.`status`                                                   AS `status`,
       `movie`.`created_at`                                               AS `createdAt`
FROM `movie_sq`.`screen_schedules` AS `sch`
         INNER JOIN
     `movie_sq`.`screens` AS `screen` ON `sch`.`screen_index` = `screen`.`index`
         LEFT JOIN
     `movie_sq`.`reservations` AS `reserve` ON `sch`.`index` = `reserve`.`screen_schedule_index`
         LEFT JOIN
     `movie_sq`.`movies` AS `movie` ON `sch`.`movie_index` = `movie`.`index`
GROUP BY `movie`.`index`
ORDER BY   `reservationRate` DESC,
           `movie`.`index` ASC
LIMIT 10;
```
- 예매취소내역(1개월이내)
```
  <select id="selectCancelReservationByEmail"
            parameterType="com.ixtx.projectmoviesq.entities.UserEntity"
            resultType="com.ixtx.projectmoviesq.dtos.TicketDto">
        SELECT `reserve`.`index`              AS `index`,
               `reserve`.`ticket_number`      AS `ticketNumber`,
               `reserve`.`user_email`         AS `userEmail`,
               `reserve`.`ticket_total`       AS `ticketTotal`,
               `reserve`.`reserved_seat_name` AS `reservedSeatName`,
               `reserve`.`payment_amount`     AS `paymentAmount`,
               `reserve`.`canceled_at`        AS `canceledAt`,
               `sch`.time_start               AS `timeStart`,
               `sch`.`time_end`               AS `timeEnd`,
               `sch`.`movie_index`            AS `movieIndex`,
               `sch`.`screen_index`           AS `screenIndex`,
               `sch`.`theater_index`          AS `theaterIndex`,
               `movie`.`title_ko`             AS `titleKo`,
               `theater`.`name`               AS `theaterName`,
               `screen`.`name`                AS `screenName`
        FROM `movie_sq`.`reservations` AS `reserve`
                 LEFT JOIN `movie_sq`.`screen_schedules` AS `sch` ON `reserve`.`screen_schedule_index` = `sch`.`index`
                 LEFT JOIN `movie_sq`.`movies` AS `movie` ON `sch`.`movie_index` = `movie`.`index`
                 LEFT JOIN `movie_sq`.`theaters` AS `theater` ON `sch`.`theater_index` = `theater`.`index`
                 LEFT JOIN `movie_sq`.`screens` AS `screen` ON `sch`.`screen_index` = `screen`.`index`
        WHERE BINARY `user_email` = #{email}
          AND `expired_flag` = true
          AND `canceled_at` > DATE_SUB(NOW(), INTERVAL 1 MONTH);
    </select>
```


## 5. API 명세서
<p>
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5c050f64-d19b-4a9e-81a3-f7d51fa04ab9" width="" title="">
</p>

## 6. 개발 
### 암호화 Util (비밀번호 및 카드번호)
![CryptoUtil](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/d5c37c4e-21dd-4bac-8951-5edcf5bb830f)

### 정규화 (회원정보 및 카드정보)
![Regex](https://github.com/hyeleeKim/projectMoviesq/assets/128495690/50939c5a-beaf-42b9-baac-5940dd9e5a6f)

### 네이버 SMS API 연동 (인증번호 전송:회원가입 & ID 찾기, 예매완료 전송)
<p width="100%">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/5654ba94-546a-4231-ab8e-b5fb6532320d" width="40%" title="인증키생성">
  <img src="https://github.com/hyeleeKim/projectMoviesq/assets/128495690/a690237f-cd84-4a44-84be-3f407ff343bd" width="40%" title="SMS API">
</p>


