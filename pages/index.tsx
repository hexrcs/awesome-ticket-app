import { NextPage } from "next";
import NextLink from "next/link";
import { Button, Flex, Text, Link } from "@chakra-ui/core";

const IndexPage: NextPage = () => {
  return (
    <Flex direction="column" alignItems="center" padding="12rem">
      <Flex direction="column" alignItems="center" marginBottom="6rem">
        <Text fontSize="100px" fontWeight="800">
          The best conference ever.
        </Text>
        <Text fontSize="3xl" fontWeight="600">
          Totally free too.
        </Text>
      </Flex>
      <NextLink href="/api/login" passHref>
        <Link>
          <Button variantColor="purple" size="lg">
            Grab your ticket
          </Button>
        </Link>
      </NextLink>
    </Flex>
  );
};

export default IndexPage;
