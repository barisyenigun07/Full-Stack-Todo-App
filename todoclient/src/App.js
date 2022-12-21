import './App.css';
import Post from './components/Post';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Todos from './components/Todos';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todos/>}></Route>
          <Route path='/post' element={<Post/>}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
