import { Link } from "react-router";
import { useState } from "react";
import { useEmployeeStore } from "../stores/useEmployeeStore";

export default function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employees = useEmployeeStore((state) => state.employees);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {employee.startDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>{employee.address.street}</div>
                      <div>
                        {employee.address.city}, {employee.address.state}{" "}
                        {employee.address.zipCode}
                      </div>
                    </td>
                  </tr>
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
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">Show</span>
            <select
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={employeesPerPage}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setEmployeesPerPage(newValue);
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <span className="ml-2">entries</span>
            <span className="ml-4">
              (Showing{" "}
              {currentEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0} to{" "}
              {Math.min(indexOfLastEmployee, filteredEmployees.length)} of{" "}
              {filteredEmployees.length} total)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-300 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {totalPages <= 5 ? (
              pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-3 py-1 border border-gray-300 rounded ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))
            ) : (
              <>
                {currentPage > 2 && (
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
                  >
                    1
                  </button>
                )}

                {currentPage > 3 && <span className="px-1">...</span>}

                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
                  >
                    {currentPage - 1}
                  </button>
                )}

                <button className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white">
                  {currentPage}
                </button>

                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
                  >
                    {currentPage + 1}
                  </button>
                )}

                {currentPage < totalPages - 2 && (
                  <span className="px-1">...</span>
                )}

                {currentPage < totalPages - 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
                  >
                    {totalPages}
                  </button>
                )}
              </>
            )}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border border-gray-300 rounded ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
