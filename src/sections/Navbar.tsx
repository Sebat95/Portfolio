import { useContext, useState } from "react";
import { experiences } from '../common/constants.ts';
import { JourneyContext } from "../components/context/JourneyContext.tsx";
import { isEmpty, isNotEmpty } from "../common/utils.ts";
import NavItems from "../components/NavItems.tsx";

interface NavProps {
  title: string;
}

const Navbar = (props: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { experience, setExperience } = useContext(JourneyContext);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const toggleExp = () => {
    setExperience(prev => isEmpty(prev) ? experiences[0]: '');
    toggleMenu();
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black/90' id='header'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          {isEmpty(props.title) ? (
            <a href="/" className="group grid-cols-1">
              <p className="row-span-1 col-span-1 text-neutral-400 group-hover:text-white transition-colors font-semibold text-xl">
                Samuele Battaglino
              </p>
              <p className="row-span-1 col-span-1 text-neutral-600 group-hover:text-neutral-400 transition-colors font-light text-base">
                Computer Engineer
              </p>
            </a>
          ) : (
            <p className="text-white font-semibold text-xl">{props.title}</p>
          )}
          {/* Smaller device navbar collapsing button */}
          <button onClick={toggleExp} className="text-neutral-400 hover:text-white focus:outline-none
            sm:hidden flex" aria-label="Toggle Menu">
            <img src={isOpen ? "/assets/close.svg": "/assets/menu.svg"} alt="toggle" className="w-6 h-6"/>
          </button>
          {/* Larger device navbar on top*/}
          <nav className="sm:flex hidden">
            <NavItems isJourneying={isNotEmpty(experience)} startExperience={toggleExp}/>
          </nav>
        </div>
      </div>
      {/* Smaller device navbar collapsing items */}
      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems isJourneying={isNotEmpty(experience)} startExperience={toggleExp}/>
        </nav>
      </div>
    </header>
  )
};

export default Navbar;
