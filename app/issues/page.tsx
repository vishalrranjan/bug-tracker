"use client";
import React, { useEffect, useState } from "react";
import { Button, Select } from "@radix-ui/themes";
import Link from "next/link";
import BugTable from "@/component/BugTable";
import { fetchBugs, Bug } from "@/lib/bug";

const IssuesPage = () => {
  const [bugData, setBugData] = useState<Bug[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

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
        <Select.Root onValueChange={setSelectedStatus} defaultValue="all">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Status</Select.Label>
              <Select.Item value="all">All</Select.Item>
              <Select.Item value="open">Open</Select.Item>
              <Select.Item value="in_progress">In Progress</Select.Item>
              <Select.Item value="closed">Closed</Select.Item>
              <Select.Item value="resolved">Resolved</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <Button>
          <Link href="/issues/new">New Bug</Link>
        </Button>
      </div>
      <BugTable bugData={filteredBugs} />
    </div>
  );
};

export default IssuesPage;
