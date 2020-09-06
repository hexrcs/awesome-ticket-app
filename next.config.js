const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    env: {
      REDIRECT_URI: isDev
        ? "http://localhost:3000/api/callback"
        : "https://awesome-ticket-app.vercel.app/api/callback",
      POST_LOGOUT_REDIRECT_URI: isDev
        ? "http://localhost:3000/"
        : "https://awesome-ticket-app.vercel.app/",
      AUTH0_SCOPE: "openid email profile",
      SERVER_URL: isDev
        ? "http://localhost:3000"
        : "https://awesome-ticket-app.vercel.app",
    },
  };
};
