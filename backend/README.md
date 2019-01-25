# api 설계 

##로그인 
POST : {baseURL}/login/

body: {
  이름 : user_name
  이메일 : email
  패스워드 :password
}

## 조회 
* 해당 파라미터를 id 를 조회 하기
GET : {baseURL}/recruits/:id

## 수정 
* id로 조회 후 수정
PUT : {baseURL}/recruits/:id

## 생성 
* 포스트 만들기 



milestone : 
esimate : 얼마나 걸릴건지
realse : 


# 필주 요구사항
질문 기수 등록일자, 사용여부, 등록한 사람 

해서 관리자 로그인 필요


# 작업내용
auto increment 테스트 추가

#ec-2
baseURL = 13.209.65.66
port = 27017



# 문제점 
auto_increment rest 필요