
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
function App() {
  return (
    <Routes>
      <Route path='/portfolio' element={<Layout />} >
        <Route index element={<Home />}/>
        <Route path='about' element={<About/>}/>
        <Route path='skills' element={<Skills/>}></Route>
        <Route path='experience' element={Experience}></Route>
        <Route path='contact' element={<Contact/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
