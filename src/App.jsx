import {BrowserRouter , Route , Routes} from "react-router-dom"
import './App.css'
import HomePage from './tasks/HomePage'
import Task5 from "./tasks/Task5";
import HomeBtn from "./components/HomeBtn";
import Task6 from "./tasks/Task6";

function App() { 

  return (
    <BrowserRouter>
      <HomeBtn /> 
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/task/5/' element={<Task5/>}></Route>
        <Route path='/task/6/' element={<Task6/>}></Route>
      </Routes> 
    </BrowserRouter>
  )
}

export default App;
