import { Suspense, useState, lazy } from 'react';
import './App.css';
import { JourneyContext } from './components/context/JourneyContext';
import Navbar from './sections/Navbar';
import { isEmpty } from './common/utils';

const Experience = lazy(() => import('./sections/Experience'));
const Intro = lazy(() => import('./sections/Intro'));
const Footer = lazy(() => import('./sections/Footer'));
const About = lazy(() => import('./sections/About'));

const App = () => {
  const [exp, setExp] = useState('');
  return (
    <main className="mx-auto">
      <JourneyContext.Provider
        value={{ experience: exp, setExperience: setExp }}
      >
        <Navbar title={exp} />
        <Suspense>
          {isEmpty(exp) && <Intro />}
          {!isEmpty(exp) && <Experience />}
          {isEmpty(exp) && <About />}
          {isEmpty(exp) && <Footer />}
        </Suspense>
      </JourneyContext.Provider>
    </main>
  );
};

export default App;
