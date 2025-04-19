import { useContext, useState } from "react";
import { experiences } from '../common/constants.ts';
import { JourneyContext } from "../components/context/JourneyContext.tsx";
import { isEmpty } from "../common/utils.ts";
import NavItems from "../components/NavItems.tsx";

interface NavProps {
  title: string;
}

const Navbar = (props: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setExperience } = useContext(JourneyContext);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const doSetExp = () => {
    setExperience(experiences[0]);
    toggleMenu();
  }

  return isEmpty(props.title) ? (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black/90' id='header'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-semibold text-xl hover:text-white transition-colors">
            Samuele Battaglino
          </a>
          {/* Smaller device navbar collapsing button */}
          <button onClick={toggleMenu} className="text-neutral-400 hover:text-white focus:outline-none
            sm:hidden flex" aria-label="Toggle Menu">
            <img src={isOpen ? "/assets/close.svg": "/assets/menu.svg"} alt="toggle" className="w-6 h-6"/>
          </button>
          {/* Larger device navbar on top*/}
          <nav className="sm:flex hidden">
            <NavItems startExperience={doSetExp}/>
          </nav>
        </div>
      </div>
      {/* Smaller device navbar collapsing items */}
      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems startExperience={doSetExp}/>
        </nav>
      </div>
    </header>
  ) : (
  <header className='fixed top-0 left-0 right-0 z-50 bg-black/90' id='header'>
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-5 mx-auto c-space">
        <p className="text-white font-semibold text-xl">{props.title}</p>
        <button onClick={() => setExperience('')} className="text-neutral-400 hover:text-white focus:outline-none flex" aria-label="exit" title="Exit Journey">
          <img src="/assets/close.svg" alt="Close" className="w-7 h-7"/>
        </button>
      </div>
    </div>
  </header>)
};

export default Navbar;
