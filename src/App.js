
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';

function App() {
  return (
    <Routes>
      <Route path='/portfolio' element={<Layout />} >
        <Route index element={<Home />}/>
        <Route path='about' element={<About/>}/>
        <Route path='skills' element={<Skills/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
