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
    <Select.Root
      size={"3"}
      onValueChange={setSelectedStatus}
      defaultValue={defaultValue}
    >
      <Select.Trigger color="orange" variant="soft" />
      <Select.Content color="orange">
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

export default SelectBugStatus;
