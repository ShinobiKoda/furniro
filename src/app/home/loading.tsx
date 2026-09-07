export default function Loading() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="p-6 border rounded-lg shadow-sm animate-pulse bg-gray-100 h-24" />
        ))}
      </div>
    </div>
  );
}