import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import MyAlbums from './pages/MyAlbums';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/MyAlbums' element={<MyAlbums />} />
      </Routes>
    </div>
  );
}

export default App;
