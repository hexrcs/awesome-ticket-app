import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
  redirectUri: process.env.REDIRECT_URI,
  scope: process.env.AUTH0_SCOPE,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET,
  },
});
