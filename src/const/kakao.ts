const OAUTH_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_REDIRECT_URI = 'http://localhost:3000/auth/kakao/request'
const REQUEST_ACCESS_TOKEN_DATA = (code:string) => {
    return {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_API_KEY,
        redirect_uri: KAKAO_REDIRECT_URI,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        code: code
    }
}