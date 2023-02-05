import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import JohnBlendon from '../assets/Blad.gif'
import Button from '../components/Button'

export default function Error() {
  const error = useRouteError()
  const navigate = useNavigate()


  if (isRouteErrorResponse(error)) {
    return (
      <div className="max-w-[600px] m-auto">
        <div className='font-bold text-3xl underline hover:underline-offset-4 text-center
          transition ease-in-out duration-300 hover:text-yellow-500 cursor-pointer'
        >
          John Błendon odwiedził tę strone
        </div>
        <img src={JohnBlendon} />
        <h1 className='text-center'>Wystąpił błąd przekierowania</h1>
        <p className='text-center'>{ error.statusText }</p>
        <Button 
          className='m-auto mt-4'
          text={'Ucieknij od Błendona'} 
          color={'primary'} 
          onClick={() => navigate(-1)} 
        />
      </div>
    )
  }

  return (
    <div className="max-w-[600px] m-auto">
      <div className='text-center'>John Błendon odwiedził tę strone</div>
      <img src={JohnBlendon} />
      <h1 className='text-center'>Wystąpił nieznany błąd przekierowania</h1>
      <Button 
        className='m-auto mt-4'
        text={'Ucieknij od Błendona'} 
        color={'primary'} 
        onClick={() => navigate(-1)} 
      />
    </div>
  )
}
