export const TableRow = ({ employee }: { employee: Employee }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {employee.firstName} {employee.lastName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.startDate}</div>
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
  );
};
