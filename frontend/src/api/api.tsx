import axios from "axios";

// 앞으로 모든 API 요청의 기본 주소를 /api로 설정 (URL 관리 편의)
const api = axios.create({
   baseURL: "/api"
});

// 요청 인터셉터
api.interceptors.request.use((config) => { // axios로 API를 요청하기 전 항상 이 함수가 먼저 실행된다.
   const token = localStorage.getItem('token'); // 토큰 추출
   
   if (token) {
	   // 요청의 헤더에 Authorization라는 이름으로 토큰을 자동 추가
      config.headers.Authorization = token;
   }
   return config;
});

export default api;