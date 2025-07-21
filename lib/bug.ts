export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

let bugData: Bug[] = [];

export async function fetchBugs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/bug`, {
    // Optionally, you can add { cache: "no-store" } if you want fresh data every time
    cache: "no-store",
  });
  const data = await res.json();
  // Sort by createdAt descending (latest first)
  const sortedData = data.sort((a: Bug, b: Bug) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  if (!res.ok) {
    throw new Error("Failed to fetch bugs");
  }
  bugData = sortedData;
  return sortedData;
}

export function getBugStatusCount() {
  const statusMap: Record<string, number> = {};

  bugData.forEach((bug) => {
    statusMap[bug.status] = (statusMap[bug.status] || 0) + 1;
  });

  return Object.entries(statusMap).map(([status, count]) => ({
    status,
    count,
  }));
}
