#4 Frontend Setup

#4.0 CRA Cleanup and Installation

- 디렉토리 정리하고
- yarn add styled-components react-router-dom graphql react-apollo-hooks apollo-boost react-helmet styled-reset react-toastify

#4.1 GlobalStyles and Theme

- styled-component 에서 글로벌 스타일을 지정할수있게 제공해주나 보다
- 글로벌스타일 세팅하고, 패딩마진 리셋하고, 자주쓸 테마 저장

#4.2 React Router

- 라우터를 만들었다

#4.3 Apollo Client

- 아폴로를 연결했다

#4.4 First Hooks Query

- Query 를 하나 만들었다
- graphql-tag 로 안해서 오류가 나서 애를 먹었다. 내 생각이 맞을 때도 있지만 자신이 없으면 맞아도 행동에 옮기지 못하는구나
- 기존에 하던 방법과는 달리 useQuery 를 사용하여 가져왔다
- isLoggedIn 을 @client 로 해서 index.js 에서 받은 client 를 가지고오네
- 그리고 가져온 isLoggedIn 을 가지고 라우트를 바꿔줌

- 그리고 GlobalStyle 몇개 추가함

#5 Frontend: Authorization Routes

#5.0 Auth Route UI part One

- Auth 페이지를 조금 만들었다
- react hooks 를 쓰면 기존보다 좋다는데 useState 를 사용했다 아직까지는 뭐가좋은지 잘 모르겠다
