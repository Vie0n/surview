import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import JohnBlendon from '../assets/Blad.gif'
import Button from '../components/Button'

export default function Error() {
  const error = useRouteError()
  const navigate = useNavigate()


  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <div className='font-bold text-3xl underline hover:underline-offset-4 
          transition ease-in-out duration-300 hover:text-yellow-500 cursor-pointer'
        >
          John Błendon odwiedził tę strone
        </div>
        <img src={JohnBlendon} />
        <h1>Wystąpił błąd przekierowania</h1>
        <p>{ error.statusText }</p>
        <Button 
          text={'Ucieknij od Błedona'} 
          color={'primary'} 
          onClick={() => navigate(-1)} 
        />
      </div>
    )
  }

  return (
    <div>
      <div>John Błendon odwiedził tę strone</div>
      <img src={JohnBlendon} />
      <h1>Wystąpił nieznany błąd przekierowania</h1>
      <Button 
        text={'Ucieknij od Błedona'} 
        color={'primary'} 
        onClick={() => navigate(-1)} 
      />
    </div>
  )
}
