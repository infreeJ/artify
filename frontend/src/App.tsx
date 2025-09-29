import { useOutlet } from 'react-router-dom'
import './App.css'
import useAuthJwt from './hooks/useAuthJwt';
import Navigation from './components/Navigation';


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
