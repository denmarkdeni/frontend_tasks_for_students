import {BrowserRouter , Route , Routes} from "react-router-dom"
import './App.css'
import HomePage from './tasks/HomePage'
import HomeBtn from "./components/HomeBtn";
import Task1 from "./tasks/Task1";
import Task2 from "./tasks/Task2";
import Task3 from "./tasks/Task3";
import Task4 from "./tasks/Task4";
import Task5 from "./tasks/Task5";
import Task6 from "./tasks/Task6";
import Task7 from "./tasks/Task7";

function App() { 

  return (
    <BrowserRouter>
      <HomeBtn /> 
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/task/1/' element={<Task1/>}></Route>
        <Route path='/task/2/' element={<Task2/>}></Route>
        <Route path='/task/3/' element={<Task3/>}></Route>
        <Route path='/task/4/' element={<Task4/>}></Route>
        <Route path='/task/5/' element={<Task5/>}></Route>
        <Route path='/task/6/' element={<Task6/>}></Route>
        <Route path='/task/7/' element={<Task7/>}></Route>
      </Routes> 
    </BrowserRouter>
  )
}

export default App;
