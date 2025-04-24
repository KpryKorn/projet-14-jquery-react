import { Link } from "react-router";
import { useEmployeeStore } from "../stores/useEmployeeStore";
import data from "../../db/data.json";
import Select from "../components/ui/Select";
import DateSelector from "../components/ui/DateSelector";
import { useState } from "react";
import { Modal } from "projet-14-modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dobValue, setDobValue] = useState<string | null>(null);
  const [startDateValue, setStartDateValue] = useState<string | null>(null);

  const handleDobChange = (value: string) => {
    setDobValue(value);
  };
  const handleStartDateChange = (value: string) => {
    setStartDateValue(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      dateOfBirth: dobValue as string,
      startDate: startDateValue as string,
      department: data.get("department") as string,
      address: {
        street: data.get("street") as string,
        city: data.get("city") as string,
        state: data.get("state") as string,
        zipCode: data.get("zip-code") as string,
      },
    };

    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18) {
        alert("Employee must be at least 18 years old.");
        return;
      }
    }

    addEmployee(employee);
    form.reset();
    openModal();
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
                  required
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
                  required
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
                <DateSelector
                  value={dobValue}
                  onChange={handleDobChange}
                  label="date-of-birth"
                />
              </div>

              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <DateSelector
                  value={startDateValue}
                  onChange={handleStartDateChange}
                  label="start-date"
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
                    required
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
                    required
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
                  <Select label="state" options={REGIONS} />
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
                    required
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
              <Select label="department" options={DEPARTMENTS} />
            </div>
            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Employee has been added"
        >
          <p>Employee added succesfully.</p>
        </Modal>
      </section>
    </>
  );
}

export default App;
