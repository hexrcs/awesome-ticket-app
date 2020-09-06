import { NextApiHandler } from "next";
import auth0 from "../../lib/auth0";

const login: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleLogin(req, res);
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).end(e.message);
  }
};

export default login;
