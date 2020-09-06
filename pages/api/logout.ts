import { NextApiHandler } from "next";
import auth0 from "../../lib/auth0";

const logout: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleLogout(req, res);
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).end(e.message);
  }
};

export default logout;
