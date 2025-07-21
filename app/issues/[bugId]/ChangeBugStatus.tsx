"use client";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SelectBugStatusProps {
  bugId: string;
  currentStatus: string;
}

const statusOptions = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CLOSED", label: "Closed" },
  { value: "RESOLVED", label: "Resolved" },
];

const ChangeBugStatus = ({ bugId, currentStatus }: SelectBugStatusProps) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleStatusChange = async (value: string) => {
    setSelectedStatus(value);
    if (value === currentStatus) return;

    try {
      const res = await fetch(`${baseUrl}/api/bug`, {
        method: "PUT",
        body: JSON.stringify({ id: bugId, status: value }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update status");
      router.refresh();
      console.log("Status updated successfully");
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <Select.Root
      size={"3"}
      onValueChange={handleStatusChange}
      defaultValue={selectedStatus}
    >
      <Select.Trigger color="crimson" variant="soft" />
      <Select.Content color="crimson">
        <Select.Group>
          {statusOptions?.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default ChangeBugStatus;
