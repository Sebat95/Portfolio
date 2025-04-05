import { useContext, useState } from "react"
import { ExperienceContext } from "../components/ExperienceContext"
import { experiences } from "../common/general"
import ComputerCombo from "../components/ComputerCombo"
import BookCombo from "../components/BookCombo"
import HobbyCombo from "../components/HobbyCombo"

const Experience = () => {
  const [expInd, setExpInd] = useState(0);
  const {setExperience } = useContext(ExperienceContext);

  const handleNavigation = (back = false) => {
    setExpInd((prev) => {
      let nxt = prev + (back ? -1 : 1);
      if (nxt < 0) {
        nxt = experiences.length - 1;
      } else if (nxt > experiences.length - 1) {
        nxt = 0
      }
      setTimeout(() => setExperience(experiences[nxt]), 0); // avoid render error
      return nxt;
    })
  }

  return (
    <section className='w-full flex flex-col relative justify-center' style={{height: '90vh'}} id='exp'>
      <div className='flex justify-between items-center z-50 experience_arrows' >
        <button className="arrow-button" onClick={() => handleNavigation(true)}>
          <img src="/assets/left-arrow.png" alt="back" className="w-5 h-5"/>
        </button>
        <button className="arrow-button" onClick={() => handleNavigation()}>
          <img src="/assets/right-arrow.png" alt="back" className="w-5 h-5"/>
        </button>
      </div>
      {expInd == 0 &&
        <BookCombo />
      }
      {expInd == 1 &&
        <ComputerCombo />
      }
      {expInd == 2 &&
        <HobbyCombo />
      }
    </section>
  )
};

export default Experience;
