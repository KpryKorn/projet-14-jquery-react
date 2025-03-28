export default function Select({
  label,
  options,
  defaultValue,
  onChange,
  width = "w-full",
}: {
  label: string;
  options: { label: string; value: string }[];
  defaultValue?: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
}) {
  return (
    <select
      name={label}
      id={label}
      value={defaultValue}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${width}`}
      onChange={onChange}
    >
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
