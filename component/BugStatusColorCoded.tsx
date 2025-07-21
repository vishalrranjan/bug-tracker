import classNames from "classnames";
import React from "react";

const StatusColorCoded = ({ status }: { status: string }) => {
  return (
    <p
      className={classNames({
        "text-purple-500 bg-purple-50": status === "IN_PROGRESS",
        "text-blue-500 bg-blue-50": status === "RESOLVED",
        "text-red-500 bg-red-50": status === "OPEN",
        "text-green-600 bg-green-50": status === "CLOSED",
        "inline-block px-2 rounded-md": true,
      })}
    >
      {status.toLowerCase()}
    </p>
  );
};

export default StatusColorCoded;
