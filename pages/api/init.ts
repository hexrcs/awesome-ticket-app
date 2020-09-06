import { NextApiHandler } from "next";
import auth0 from "../../lib/auth0";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const init: NextApiHandler = async (req, res) => {
  try {
    const session = await auth0.getSession(req);
    const sessionUser = session.user;

    console.log(sessionUser);

    const sub: string = sessionUser.sub;
    const nickname: string = sessionUser.nickname;
    const email: string = sessionUser.email;
    const name: string = sessionUser.name;
    const picture: string = sessionUser.picture;

    let user = await prisma.user.findOne({ where: { authId: sub } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
          handle: nickname,
          name: name,
          picture: picture,
          authId: sub,
          ticket: {
            create: {},
          },
        },
      });
    } else {
      user = await prisma.user.update({
        where: {
          authId: user.authId,
        },
        data: {
          email: email,
          handle: nickname,
          name: name,
          picture: picture,
        },
      });
    }

    const ticket = await prisma.ticket.findOne({
      where: { userId: user.id },
    });
    res.writeHead(302, { location: `/ticket/${ticket.ticketNr}` }).end();
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).end(e.message);
  }
};

export default init;
