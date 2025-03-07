import { useState } from 'react';
import './App.css'
import { ExperienceContext } from './components/ExperienceContext';
import About from './sections/About';
import Footer from './sections/Footer';
import Intro from './sections/Intro';
import Navbar from './sections/Navbar';
import Experience from './sections/Experience';
import { isEmpty } from './constants/general';

const App = () => {
  const [exp, setExp] = useState('');
  return (
    <main className='mx-auto'>
      <ExperienceContext.Provider value={{experience: exp,  setExperience: setExp}}>
        <Navbar  title={exp}/>
        {isEmpty(exp) && <Intro />}
        {!isEmpty(exp) && <Experience />}
        {isEmpty(exp) && <About />}
        {isEmpty(exp) && <Footer />}
      </ExperienceContext.Provider>
    </main>
)}

export default App;
