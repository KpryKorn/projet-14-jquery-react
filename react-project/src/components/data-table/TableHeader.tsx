import { SortIndicator } from "./SortIndicator";

export const TableHeader = ({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
}: {
  label: string;
  field: string;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
}) => {
  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => onSort(field)}
    >
      {label}{" "}
      <SortIndicator
        field={field}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    </th>
  );
};
