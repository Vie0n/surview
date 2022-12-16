import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function Error() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Wystąpił błąd przekierowania</h1>
        <p>{ error.statusText }</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Wystąpił nieznany błąd przekierowania</h1>
    </div>
  )
}
