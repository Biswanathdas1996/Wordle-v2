import { Cell } from './Cell'

export const EmptyRow = ({ length }: any) => {
  const emptyCells = Array.from(Array(length))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
