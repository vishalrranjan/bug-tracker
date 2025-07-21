import BugCards from "@/component/BugCards";
import StatusColorCoded from "@/component/BugStatusColorCoded";
import SimpleBarChart from "@/component/SimpleBarChart";
import { fetchBugs, Bug, getBugStatusCount } from "@/lib/bug";
export default async function Home() {
  const bugData = await fetchBugs();
  const bugStatusCount = await getBugStatusCount();

  return (
    <div className="flex justify-center gap-3 min-h-auto w-full">
      <div className="w-1/2">
        <div className="flex gap-3">
          <BugCards />
        </div>
        <div className="h-auto border border-gray-200 rounded-md mt-4 px-4 py-6">
          <SimpleBarChart bugStatusCount={bugStatusCount} />
        </div>
      </div>
      <div className="w-1/2 border border-gray-200 rounded-md ">
        <p className="p-2 font-semibold">Latest Issues</p>
        <div className="p-2">
          {bugData.slice(0, 10).map((bug: Bug) => (
            <div key={bug.id} className="p-2 border-b border-gray-200">
              <p className="text-zinc-700">{bug.title}</p>
              <StatusColorCoded status={bug.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
