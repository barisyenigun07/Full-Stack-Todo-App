import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import Todo from './components/Todo';
import UpdateTodo from './components/UpdateTodo';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todos/>}></Route>
          <Route path='/post' element={<AddTodo/>}></Route>
          <Route path='/todo/:id' element={<Todo/>}></Route>
          <Route path='/update/todo/:id' element={<UpdateTodo/>}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
