import { useContext, useState } from 'react';
import { JourneyContext } from '../components/context/JourneyContext';
import { experiences } from '../common/constants';
import ComputerCombo from '../components/ComputerCombo';
import BookCombo from '../components/BookCombo';
import HobbyCombo from '../components/HobbyCombo';

const Experience = () => {
  const [expInd, setExpInd] = useState(0);
  const { setExperience } = useContext(JourneyContext);

  const handleNavigation = (back = false) => {
    setExpInd((prev) => {
      let nxt = prev + (back ? -1 : 1);
      if (nxt < 0) {
        nxt = experiences.length - 1;
      } else if (nxt > experiences.length - 1) {
        nxt = 0;
      }
      setTimeout(() => setExperience(experiences[nxt]), 0); // avoid render error
      return nxt;
    });
  };

  return (
    <section
      className="relative flex w-full flex-col justify-center"
      style={{ height: '90vh' }}
      id="exp"
    >
      <div className="arrow-space fixed left-0 z-50">
        <button className="arrow-button" onClick={() => handleNavigation(true)}>
          <img src="/assets/left-arrow.png" alt="back" className="h-5 w-5" />
        </button>
      </div>
      <div className="arrow-space fixed right-0 z-50">
        <button className="arrow-button" onClick={() => handleNavigation()}>
          <img src="/assets/right-arrow.png" alt="back" className="h-5 w-5" />
        </button>
      </div>
      {expInd == 0 && <BookCombo />}
      {expInd == 1 && <ComputerCombo />}
      {expInd == 2 && <HobbyCombo />}
    </section>
  );
};

export default Experience;
