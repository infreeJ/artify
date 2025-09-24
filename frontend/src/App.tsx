import { useOutlet } from 'react-router-dom'
import './App.css'
import Navigation from './pages/Navigation';
import useAuthJwt from './hooks/useAuthJwt';


function App() {

  const currentOutlet = useOutlet();

  useAuthJwt();


  return (
    <>
      <Navigation></Navigation>
      {currentOutlet}
    </>
  )
}

export default App
