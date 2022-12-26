import { IButtonProps } from '../@types/button'


export default function Button(props: IButtonProps) {
  const { text, color, className, disabled } = props

  if (disabled) {
    return (
      <div className="flex space-x-2 justify-center">
        <button 
          {...props}
          className={`inline-block px-6 py-2.5  text-white font-medium text-md leading-tight 
          uppercase rounded bg-gray-400 transition duration-150 ${ className }`}
        >
          { text }
        </button>
      </div>
    )
  }

  const classColor = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700',
    success: 'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:bg-green-600',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 focus:bg-red-700',
    info: 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 focus:bg-blue-500'
  }[color]

  return (
    <div className="flex space-x-2 justify-center">
      <button 
        {...props}
        className={`inline-block px-6 py-2.5  text-white font-medium text-md leading-tight 
        uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg 
        focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 
        ease-in-out ${ classColor } ${ className }`}
      >
        { text }
      </button>
    </div>
  )
}