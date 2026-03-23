export const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500">Coming soon</p>
    </div>
  </div>
)
