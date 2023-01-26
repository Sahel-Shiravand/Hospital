
import './App.css'
import { useParams,BrowserRouter, Route,Routes } from 'react-router-dom';

import HospitalListPage from './pages/HospitalListPage'
import Hospital from './pages/Hospital';
function App() {

  return (
   <div className="App"> 
   <BrowserRouter>
    
     <Routes>
     <Route path='/' element={<HospitalListPage/>}/>
    <Route  path=':id' element={<Hospital/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
