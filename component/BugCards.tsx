import { getBugStatusCount } from "@/lib/bug";
import { Box, Card, Text } from "@radix-ui/themes";
import React from "react";

const BugCards = async () => {
  const bugStatusCount = await getBugStatusCount();

  return (
    <>
      {bugStatusCount.map((item) => (
        <Box key={item.status} className="cursor-pointer">
          <Card>
            <Text as="div" size="2">
              {item.status.charAt(0).toUpperCase() +
                item.status.slice(1).toLowerCase()}{" "}
              Issue
            </Text>
            <Text as="div" weight="bold" size="2">
              {item.count}
            </Text>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default BugCards;
