import { getBugStatusCount } from "@/lib/bug";
import { Box, Card, Text } from "@radix-ui/themes";
import classNames from "classnames";
import React from "react";

const BugCards = async () => {
  const bugStatusCount = await getBugStatusCount();

  return (
    <>
      {bugStatusCount.map((item) => (
        <Box key={item.status} className="cursor-pointer">
          <Card
            className={classNames(
              {
                "bg-green-100": item.status === "CLOSED",
                "bg-blue-100": item.status === "RESOLVED",
                "bg-red-100": item.status === "OPEN",
                "bg-indigo-100": item.status === "IN_PROGRESS",
              }
              // `bg-${item.status.toLowerCase()}-100 hover:bg-${item.status.toLowerCase()}-200`
            )}
          >
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
