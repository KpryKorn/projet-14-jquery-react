import { Link } from "react-router";
import { useEmployeeStore } from "../stores/useEmployeeStore";
import data from "../../db/data.json";
import Select from "../components/ui/Select";

function App() {
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const employees = useEmployeeStore((state) => state.employees);
  console.log("State global de l'application:", employees);

  const REGIONS = data.regions;
  const DEPARTMENTS = data.departments;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const employee = {
      firstName: data.get("first-name") as string,
      lastName: data.get("last-name") as string,
      dateOfBirth: data.get("date-of-birth") as string,
      startDate: data.get("start-date") as string,
      department: data.get("department") as string,
      address: {
        street: data.get("street") as string,
        city: data.get("city") as string,
        state: data.get("state") as string,
        zipCode: data.get("zip-code") as string,
      },
    };

    addEmployee(employee);
    form.reset();
    alert("Employee added successfully");
  }
  return (
    <>
      <section className="container">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Link
            to="/employee"
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
          >
            View Current Employees
          </Link>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Create Employee
          </h2>
          <form
            onSubmit={handleSubmit}
            id="create-employee"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="date-of-birth"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  id="date-of-birth"
                  name="date-of-birth"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  id="start-date"
                  name="start-date"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <fieldset className="border border-gray-200 rounded-md p-4 mt-6">
              <legend className="text-sm font-medium text-gray-700 px-2">
                Address
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <Select options={REGIONS} />
                </div>

                <div>
                  <label
                    htmlFor="zip-code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Zip Code
                  </label>
                  <input
                    id="zip-code"
                    name="zip-code"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <Select options={DEPARTMENTS} />
            </div>
            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
