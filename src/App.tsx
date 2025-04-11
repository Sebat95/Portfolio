import { useState } from 'react';
import './App.css'
import { JourneyContext } from './components/context/JourneyContext';
import About from './sections/About';
import Footer from './sections/Footer';
import Intro from './sections/Intro';
import Navbar from './sections/Navbar';
import Experience from './sections/Experience';
import { isEmpty } from './common/utils';

const App = () => {
  const [exp, setExp] = useState('');
  return (
    <main className='mx-auto'>
      <JourneyContext.Provider value={{experience: exp,  setExperience: setExp}}>
        <Navbar  title={exp}/>
        {isEmpty(exp) && <Intro />}
        {!isEmpty(exp) && <Experience />}
        {isEmpty(exp) && <About />}
        {isEmpty(exp) && <Footer />}
      </JourneyContext.Provider>
    </main>
)}

export default App;
