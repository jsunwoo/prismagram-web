#4 Frontend Setup

#4.0 CRA Cleanup and Installation

- 디렉토리 정리하고
- yarn add styled-components react-router-dom graphql react-apollo-hooks apollo-boost react-helmet styled-reset react-toastify

#4.1 GlobalStyles and Theme

- styled-component 에서 글로벌 스타일을 지정할수있게 제공해주나 보다
- 글로벌스타일 세팅하고, 패딩마진 리셋하고, 자주쓸 테마 저장
- App.js 에서 ThemeProvider, GlobalStyles 로 추가

#4.2 React Router

- 라우터를 만들었다

#4.3 Apollo Client

- 아폴로를 연결했다
- index.js 에서 ApolloProvider 로 Client.js 연결

#4.4 First Hooks Query

- App.js 에 Query 를 하나 만들었다
- graphql-tag 로 안해서 오류가 나서 애를 먹었다. 내 생각이 맞을 때도 있지만 자신이 없으면 맞아도 행동에 옮기지 못하는구나
- 기존에 하던 방법과는 달리 useQuery 를 사용하여 가져왔다
- isLoggedIn 을 @client 로 해서 index.js 에서 받은 client 를 가지고오네
- 그리고 가져온 isLoggedIn 을 가지고 라우트를 바꿔줌

- 그리고 GlobalStyle 몇개 추가함

#5 Frontend: Authorization Routes (~23)

#5.0 Auth Route UI part One

- Auth 페이지를 조금 만들었다
- react hooks 를 쓰면 기존보다 좋다는데 useState 를 사용했다 아직까지는 뭐가좋은지 잘 모르겠다
- 유투브 10분 훅스 설명 영상 보니까 확실히 편하긴 하네

#5.1 Footer and Auth UI part Two

- Footer 를 추가했다
- hooks 를 써서 state 에 따라 변하는 Auth 를 만듦

#5.2 Footer and Auth UI part Three

- Button 과 Input 컴포넌트를 만들었다
- 그걸 Auth 에 추가하였다
- 특별한 건 없었음

#5.3 Auth Form with Hooks

- Input 에 Props 를 세개 추가했는데 그 중 value, onChange 를 useInput 에 구현해서 넣어줌
- 이게 확실히 hooks 를 쓰니까 간결해 보이는데 아직까진 적응이 안되는 중

- type Prop 도 추가하니 password, email type 정말 간편하게 설정가능하네
- 기존의 react 를 잘 모르니 나아진점을 모르는 거 일수도 있음, 기존이 더 깔끔해보이는데 나는

#5.4 requestSecret Mutation and Refactor

- 드디어 Container, Presenter 나누는 기준을 알았다
- Container 는 State, Hooks, Data (JS) 들 Presenter 는 Css, Components (HTML, CSS) 들
- 그리고 기존이 깔끔해 보인다 했는데, 기존이 Container/Presenter 형태인데 hooks 를 계속 쓸수 있는거임
- 고로 hooks 를 안쓸 이유가 없어 보인다
- 4분 부터 쿼리 추가
- onLogin 을 onSubmit 에 추가해서 Log In 버튼을 눌러도 default 가 안되게 막음
- AuthQueries 에 LOG_IN 을 추가하였음
- 그리고 form 에서 submit 할 때 requestSecret mutation 을 실행하게 끔 함
- https://github.com/trojanowski/react-apollo-hooks (useMution) 참고

#5.5 Toastify and createAccount Mutation

- App.js 에 ToastContainer 를 추가하였고 왼쪽 아래에 position 을 설정함
- useMutation 는 update 함수가 있는데 watch 랑 비슷하게 쿼리 실행될때 실행되는 함수
- requestSecret 에 update 를 추가하였다
- 그리고 update 에서 받아온 값으로 오류 처리를 해주었다
- 시간 지나면 자동으로 Sign up 화면으로 바꿔주는 처리도 해줌
- CREAT_ACCOUNT 라는 mutation 을 하나 만듦
- onLogin 함수를 onSubmit 으로 바꾸고 login, signup 버튼 두개를 처리해주기로 함
- Html5 에 필드 필수입력 기능이 있는데도 불구하고 toast 로 에러처리를 하는걸 보며 감명받았음..

#5.6 createAccount Mutation part Two

- requestSecret, createAccount 를 비동기로 바꾸고 오류 처리를 해주었다
- 백엔드에서 throw Error 를 해주니 catch 에서 오류를 잘 잡아서 toast 로 보여주는걸 확인했음

- requestSecret 에 있는 update 함수를 없애고 onSubmit 함수 안에서 처리해주었다
- update 함수는 주로 cache 를 update 할 때 사용한다고 한다 (?)
- 즉, Client.js 에 있는 defaults 를 update 할 때 (그럼 client 의 defaults 가 cache 란 소린가?)
- Apollo Client 에 access 해야 할때 update 함수를 사용한다
- 고로 우리는 Apollo Client 에 접근 할 필요가 없어서 onSubmit 에서 data 값을 가져온 뒤에 처리해주었다

- 오류가 났었는데 requestSecret 를 data: { requestSecret } 로 바꿔주니 해결되었다
- 이런 사소한 디테일은 어떻게 혼자 해결하지? 솔직히 혼자 해결하려면 몇시간은 걸렸을 건데.. 결국엔 경험이 중요한가보다

- 백에서 createAccount API username 이 존재하는지 확인하는 코드를 넣었다
- 그리고 있다면 에러를 던져주기로 했다
- 니코도 버그가 많아서 강의를 끊고 다음 영상으로 넘어가는데 저 위 버그는 해결한 것 같은데?
- sendmailer 는 나도 안된다 왜 안오는지 모르겠음! ㅡ ㅡ

#5.7 createAccount Mutation part Three

- 위에 있었던 data: { requestSecret } 에 관한 의문이 조금 풀렸다
- const requestSecret = await requestSecretMutation();
- requestSecret 로그를 찍어보니 data: {request: false} 이렇게 나온다, 그러면 이해됨
- const { requestSecret } = await requestSecretMutation();
- 그런데 또 이렇게 찍으면 안나온다 !! undefined 로 나옴
- {} 를 쓸때 안쓸때의 차이를 알고싶다! () 도

- requestSecret true 일 경우를 처리해주었다

- firstname, lastname 이 안들어가서 봤더니 n을 소문자로 써서 안들어 갔었음
- 여러가지 시도를 해봤는데.. 그냥 맞춰서 보내는게 낫겠다

- form 을 나누는 방식을 : 에서 action === "logIn" && () 이걸로 바꿨다
- 이유는 confirm action 을 하나 더 추가해서
- 그리고 reqestSecret 성공하면 confirmSecret form 으로 화면을 넘겨주었다

#6 Frontend: Header Component (30m) 24
#7 Frontend: Feed (105m) 25, 26, 27, 28
#8 Frontend: Search (60m) 29, 30
#9 Frontend: Profile (30m) 31
