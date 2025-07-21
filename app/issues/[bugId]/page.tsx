import { Button } from "@radix-ui/themes";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface PageProps {
  params: {
    bugId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { bugId } = await params;
  const fetchBugById = await fetch(`${baseUrl}/api/bug?bugId=${bugId}`);
  const bugDetails = await fetchBugById.json();
  console.log(bugDetails);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1>Issue Details </h1>
        <div className="flex gap-3">
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
        <p className="font-semibold">Title: {bugDetails.title}</p>
        <p className="text-gray-600">Description: {bugDetails.description}</p>
        <p className="text-gray-600">Status: {bugDetails.status}</p>
      </div>
    </div>
  );
};

export default Page;
