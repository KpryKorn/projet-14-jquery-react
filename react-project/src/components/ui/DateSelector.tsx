export default function DateSelector({ label }: { label: string }) {
  return (
    <input
      id={label.toLowerCase()}
      name={label.toLowerCase()}
      type="date"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
