"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import BugTable from "@/component/BugTable";
import { fetchBugs, Bug } from "@/lib/bug";
import SelectBugStatus from "@/component/SelectBugStatus";

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
        <SelectBugStatus
          setSelectedStatus={setSelectedStatus}
          statusOptions={statusOptions}
          defaultValue={"all"}
        />

        <Button>
          <Link href="/issues/new">New Bug</Link>
        </Button>
      </div>
      <BugTable bugData={filteredBugs} />
    </div>
  );
};

export default IssuesPage;
