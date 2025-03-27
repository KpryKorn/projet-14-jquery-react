export const SortIndicator = ({
  field,
  sortField,
  sortDirection,
}: {
  field: string;
  sortField: string;
  sortDirection: "asc" | "desc";
}) => {
  if (sortField !== field) return null;
  return <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>;
};
