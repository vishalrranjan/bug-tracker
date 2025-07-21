import { Bug } from "@/lib/bug";
import { Table } from "@radix-ui/themes";
import React from "react";
import StatusColorCoded from "./BugStatusColorCoded";
import { FaEye } from "react-icons/fa";
import Link from "next/link";

const BugTable = ({ bugData }: { bugData: Bug[] }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!bugData || bugData.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={3}>No bugs found.</Table.Cell>
          </Table.Row>
        ) : (
          bugData.map((bug: Bug) => (
            <Table.Row key={bug.id}>
              <Table.RowHeaderCell>{bug.title}</Table.RowHeaderCell>
              <Table.Cell>
                <StatusColorCoded status={bug.status} />
              </Table.Cell>
              <Table.Cell>{new Date(bug.createdAt).toDateString()}</Table.Cell>
              <Table.Cell>
                <Link href={`/issues/${bug.id}`}>
                  <FaEye color="gray" size={20} className="cursor-pointer" />
                </Link>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default BugTable;
