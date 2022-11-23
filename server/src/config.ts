import 'dotenv/config';

const config = {
    port: 4000,
    cookies: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    twitter: {
        redirect_uri: `${process.env.API_URL}/auth/twitter/callback`,
        login_url: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=dTdacThkLVZER0pCZkZ6SklUTjI6MTpjaQ&redirect_uri=${process.env.API_URL}/auth/twitter/callback&scope=tweet.read%20users.read%20follows.read&state=state&code_challenge=challenge&code_challenge_method=plain`,
    },
};

export default config;
