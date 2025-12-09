
type StatCardProps ={
  title: string
  value: number
}

export default function StatCard ({ title, value}: StatCardProps) {

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  )
}