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
  return (
    <div className="flex items-center text-sm text-gray-600">
      <span className="mr-2">Show</span>
      <select
        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        value={employeesPerPage}
        onChange={(e) => onEmployeesPerPageChange(parseInt(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <span className="ml-2">entries</span>
      <span className="ml-4">
        (Showing {currentEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0} to{" "}
        {Math.min(indexOfLastEmployee, filteredEmployeesLength)} of{" "}
        {filteredEmployeesLength} total)
      </span>
    </div>
  );
};
