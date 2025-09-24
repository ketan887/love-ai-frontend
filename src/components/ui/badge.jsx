export function Badge({ children, className = "", ...props }) {
  return (
    <span
      {...props}
      className={`px-2 py-1 text-xs font-medium rounded bg-gray-200 text-gray-700 ${className}`}
    >
      {children}
    </span>
  )
}
