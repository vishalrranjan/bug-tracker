import BugStatusColorCoded from "@/component/BugStatusColorCoded";
import { Button } from "@radix-ui/themes";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ChangeBugStatus from "./ChangeBugStatus";

interface PageProps {
  params: {
    bugId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { bugId } = await params;
  const fetchBugById = await fetch(`${baseUrl}/api/bug?bugId=${bugId}`, {
    cache: "no-store",
  });
  const bugDetails = await fetchBugById.json();

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1>Issue Details </h1>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <p>Update Status:</p>
            <ChangeBugStatus
              bugId={bugDetails.id}
              currentStatus={bugDetails.status}
            />
          </div>

          <Button className="cursor-pointer">
            <FaEdit />
            Edit Issue
          </Button>
          <Button color="red" className="cursor-pointer">
            <MdDelete />
            Delete Issue
          </Button>
        </div>
      </div>
      <div>
        <p className="font-semibold text-2xl mb-2">{bugDetails.title}</p>
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <BugStatusColorCoded status={bugDetails.status} />
          <p>{new Date(bugDetails.createdAt).toDateString()}</p>
        </div>
        <div className="border border-gray-200 rounded-md px-4 p-6 text-gray-600">
          {bugDetails.description}
        </div>
      </div>
    </div>
  );
};

export default Page;
