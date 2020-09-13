import { GetServerSideProps, NextPage } from "next";
import ErrorPage from "next/error";
import { PrismaClient } from "@prisma/client";
import { Box, Button, Text, Flex, Link } from "@chakra-ui/core";
import Ticket from "../../components/Ticket";
import { TwitterShareButton } from "react-share";
import NextLink from "next/link";
import auth0 from "../../lib/auth0";

const prisma = new PrismaClient();

type Props = {
  data?: {
    handle: string;
    name: string;
    picture: string;
    ticketNr: number;
  };
  isLoggedOut?: boolean;
  errorCode?: number;
};

const TicketPage: NextPage<Props> = ({ data, errorCode, isLoggedOut }) => {
  if (errorCode) {
    return <ErrorPage statusCode={errorCode} />;
  }

  return (
    <Flex direction="column" alignItems="center" padding="12rem">
      <Text fontSize="80px" fontWeight="800">
        Awesome, here's your ticket!
      </Text>

      <Ticket {...data} />
      <Flex>
        <TwitterShareButton
          url={`${process.env.SERVER_URL}/ticket/${data.ticketNr}`}
          title="Check out my ticket on this awesome ticket app! 👉 "
        >
          <Button size="sm" variantColor="blue" margin="1rem">
            Share on Twitter
          </Button>
        </TwitterShareButton>
        {!isLoggedOut && (
          <NextLink href="/api/logout" passHref>
            <Link>
              <Button size="sm" variantColor="red" margin="1rem">
                Log out
              </Button>
            </Link>
          </NextLink>
        )}
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const session = await auth0.getSession(req);

  const ticketNr = Number(params.ticketNr);
  try {
    let ticket = (
      await prisma.ticket.findMany({
        where: { ticketNr: ticketNr },
      })
    )[0];
    if (!ticket) {
      res.statusCode = 404;
      return {
        props: {
          errorCode: 404,
        },
      };
    }
    const user = await prisma.user.findOne({
      where: { id: ticket.userId },
    });

    return {
      props: {
        data: {
          handle: user.handle,
          name: user.name,
          picture: user.picture,
          ticketNr: ticketNr,
        },
        isLoggedOut: !session,
      },
    };
  } catch (e) {
    console.log(e.message);
    res.statusCode = 500;
    return {
      props: {
        errorCode: 500,
      },
    };
  }
};

export default TicketPage;
