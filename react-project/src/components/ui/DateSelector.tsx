export default function DateSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string | null;
  onChange?: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) return onChange(e.target.value);
  };
  return (
    <input
      id={label.toLowerCase()}
      name={label.toLowerCase()}
      type="date"
      value={value || ""}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
