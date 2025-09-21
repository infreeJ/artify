import { useOutlet } from 'react-router-dom'
import './App.css'
import Navigation from './pages/Navigation';

function App() {

  const currentOutlet = useOutlet();

  return (
    <>
      <Navigation></Navigation>
      {currentOutlet}
    </>
  )
}

export default App
