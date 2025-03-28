import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Employee {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  address: {
    city: string;
    street: string;
    zipCode: string;
    state: string;
  };
}

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  removeEmployee: (employee: Employee) => void;
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
      removeEmployee: (employee) => {
        set((state) => ({
          employees: state.employees.filter(
            (e) => e.firstName !== employee.firstName
          ),
        }));
      },
    }),
    {
      name: "employee-storage",
    }
  )
);
