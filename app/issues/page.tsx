"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import BugTable from "@/component/BugTable";
import { fetchBugs, Bug } from "@/lib/bug";
import SelectBugStatus from "@/component/SelectBugStatus";
import { FiPlusCircle } from "react-icons/fi";
const IssuesPage = () => {
  const [bugData, setBugData] = useState<Bug[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "closed", label: "Closed" },
    { value: "resolved", label: "Resolved" },
  ];

  useEffect(() => {
    fetchBugs().then(setBugData);
  }, []);

  const filteredBugs =
    selectedStatus === "all"
      ? bugData
      : bugData.filter((bug) => bug.status.toLowerCase() === selectedStatus);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium">View Status:</p>
          <SelectBugStatus
            setSelectedStatus={setSelectedStatus}
            statusOptions={statusOptions}
            defaultValue={"all"}
          />
        </div>

        <Button size={"3"} color="cyan">
          <Link href="/issues/new">Report New Bug</Link>
          <FiPlusCircle />
        </Button>
      </div>
      <BugTable bugData={filteredBugs} />
    </div>
  );
};

export default IssuesPage;
