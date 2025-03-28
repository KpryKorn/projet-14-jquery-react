import Select from "../ui/Select";

export const EntriesPerPageSelector = ({
  employeesPerPage,
  onEmployeesPerPageChange,
  currentEmployees,
  indexOfFirstEmployee,
  indexOfLastEmployee,
  filteredEmployeesLength,
}: {
  employeesPerPage: number;
  onEmployeesPerPageChange: (value: number) => void;
  currentEmployees: Employee[];
  indexOfFirstEmployee: number;
  indexOfLastEmployee: number;
  filteredEmployeesLength: number;
}) => {
  const options = [
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "20", value: "20" },
  ];
  return (
    <div className="flex items-center text-sm text-gray-600">
      <span className="mr-2">Show</span>
      <Select
        options={options}
        defaultValue={employeesPerPage}
        onChange={(e) => onEmployeesPerPageChange(parseInt(e.target.value))}
        width="w-auto"
      />
      <span className="ml-2">entries</span>
      <span className="ml-4">
        (Showing {currentEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0} to{" "}
        {Math.min(indexOfLastEmployee, filteredEmployeesLength)} of{" "}
        {filteredEmployeesLength} total)
      </span>
    </div>
  );
};
