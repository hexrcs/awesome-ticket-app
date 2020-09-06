import React from "react";
import { Text, Flex, Avatar } from "@chakra-ui/core";
import styled from "@emotion/styled";

type Props = {
  handle: string;
  name: string;
  picture: string;
  ticketNr: number;
};

const Ticket: React.FC<Props> = (props) => {
  return (
    <Flex
      width="lg"
      height="2xs"
      justifyContent="space-between"
      borderWidth="2px"
      borderRadius="0.5rem"
      padding="1rem"
      margin="2rem"
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        paddingX="1rem"
      >
        <Flex alignItems="center">
          <Avatar
            name={props.name}
            src={props.picture}
            size="xl"
            borderWidth="1px"
            backgroundColor="none"
          />
          <Flex flexDirection="column" marginLeft="1rem">
            <Text fontSize="4xl" fontWeight="700">
              {props.name}
            </Text>
            <Text
              fontFamily="monospace"
              fontSize="20px"
              fontWeight="600"
              color="grey"
            >
              @{props.handle}
            </Text>
          </Flex>
        </Flex>
        <Text fontSize="4xl" fontWeight="800" color="tomato">
          Awesomeness
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        borderLeftStyle="dashed"
        borderLeftWidth="2px"
        paddingLeft="1rem"
      >
        <VerticalText fontSize="3xl" fontWeight="800" color="gray.500">
          Nr. {props.ticketNr.toString().padStart(6, "0")}
        </VerticalText>
      </Flex>
    </Flex>
  );
};

const VerticalText = styled(Text)`
  writing-mode: vertical-rl;
`;

export default Ticket;
