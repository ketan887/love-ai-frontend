export function Card({ children, className = "", ...props }) {
  return (
    <div {...props} className={`rounded-lg shadow bg-white ${className}`}>
      {children}
    </div>
  )
}




export function CardHeader({ children, className = "", ...props }) {
  return (
    <div {...props} className={`px-4 py-2 border-b font-semibold ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div {...props} className={`p-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div {...props} className={`px-4 py-2 border-t text-sm text-gray-600 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3 {...props} className={`text-lg font-bold ${className}`}>
      {children}
    </h3>
  )
}
