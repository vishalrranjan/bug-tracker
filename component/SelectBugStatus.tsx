import { Select } from "@radix-ui/themes";

type BugStatus = "all" | "open" | "in_progress" | "closed" | "resolved";
interface StatusOption {
  value: string;
  label: string;
}
interface SelectBugStatusProps {
  setSelectedStatus: (status: BugStatus) => void;
  statusOptions: StatusOption[];
  defaultValue: string;
}

const SelectBugStatus: React.FC<SelectBugStatusProps> = ({
  setSelectedStatus,
  statusOptions,
  defaultValue,
}) => {
  return (
    <Select.Root onValueChange={setSelectedStatus} defaultValue={defaultValue}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
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

export default SelectBugStatus;
