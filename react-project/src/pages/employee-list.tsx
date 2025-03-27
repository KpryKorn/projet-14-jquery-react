import { Link } from "react-router";
import { useState } from "react";
import { useEmployeeStore } from "../stores/useEmployeeStore";
import { TableHeader } from "../components/data-table/TableHeader";
import { TableRow } from "../components/data-table/TableRow";
import { EntriesPerPageSelector } from "../components/data-table/PageEntries";
import { Pagination } from "../components/data-table/Pagination";

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employees = useEmployeeStore((state) => state.employees);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);

  const [sortField, setSortField] = useState<string>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEmployeesPerPageChange = (value: number) => {
    setEmployeesPerPage(value);
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(searchValue) ||
      employee.lastName.toLowerCase().includes(searchValue) ||
      employee.department.toLowerCase().includes(searchValue) ||
      employee.address.city.toLowerCase().includes(searchValue)
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aValue, bValue;

    switch (sortField) {
      case "name":
        aValue = `${a.lastName} ${a.firstName}`.toLowerCase();
        bValue = `${b.lastName} ${b.firstName}`.toLowerCase();
        break;
      case "startDate":
        aValue = a.startDate;
        bValue = b.startDate;
        break;
      case "department":
        aValue = a.department.toLowerCase();
        bValue = b.department.toLowerCase();
        break;
      case "dateOfBirth":
        aValue = a.dateOfBirth;
        bValue = b.dateOfBirth;
        break;
      case "address":
        aValue = `${a.address.city} ${a.address.state}`.toLowerCase();
        bValue = `${b.address.city} ${b.address.state}`.toLowerCase();
        break;
      default:
        aValue = a.lastName.toLowerCase();
        bValue = b.lastName.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

  return (
    <>
      <section className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Current Employees
          </h1>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            Create New Employee
          </Link>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader
                  label="Name"
                  field="name"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Start Date"
                  field="startDate"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Department"
                  field="department"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Date of Birth"
                  field="dateOfBirth"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Address"
                  field="address"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEmployees.length > 0 ? (
                currentEmployees.map((employee, idx) => (
                  <TableRow key={idx} employee={employee} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <EntriesPerPageSelector
            employeesPerPage={employeesPerPage}
            onEmployeesPerPageChange={handleEmployeesPerPageChange}
            currentEmployees={currentEmployees}
            indexOfFirstEmployee={indexOfFirstEmployee}
            indexOfLastEmployee={indexOfLastEmployee}
            filteredEmployeesLength={sortedEmployees.length}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
}
