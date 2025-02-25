import { useState } from 'react';
import './App.css'
import { ExperienceContext } from './components/ExperienceContext';
import About from './sections/About';
import Footer from './sections/Footer';
import Intro from './sections/Intro';
import Navbar from './sections/Navbar';
import Experience from './sections/Experience';

const App = () => {
  const [exp, setExp] = useState(false);
  return (
    <main className='mx-auto'>
      <ExperienceContext.Provider value={{experience: exp, setExperience: setExp}}>
        {!exp && <Navbar />}
        {!exp && <Intro />}
        {exp && <Experience />}
        {!exp && <About />}
        {!exp && <Footer />}
      </ExperienceContext.Provider>
    </main>
)}

export default App;
