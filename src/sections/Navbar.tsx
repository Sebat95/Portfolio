import { useContext, useState } from "react";
import { isEmpty, navLinks } from '../constants/general.ts';
import { ExperienceContext } from "../components/ExperienceContext.tsx";

interface NavProps {
  title: string;
}

const NavItems = () => {
  return (
    <ul className="nav-ul">
      {navLinks.map(({id, href, name}) => (
        <li key={id} className="nav-li">
          <a href={href} className="nav-li_a" onClick={() => {}}>{name}</a>
        </li>
      ))}
    </ul>
  )
};

const Navbar = (props: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {setExperience } = useContext(ExperienceContext);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return isEmpty(props.title) ? (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black/90' id='header'>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-semibold text-xl hover:text-white transition-colors">
            Welcome to my personal site
          </a>
          {/* Smaller device navbar collapsing button */}
          <button onClick={toggleMenu} className="text-neutral-400 hover:text-white focus:outline-none
            sm:hidden flex" aria-label="Toggle Menu">
            <img src={isOpen ? "/assets/close.svg": "/assets/menu.svg"} alt="toggle" className="w-6 h-6"/>
          </button>
          {/* Larger device navbar on top*/}
          <nav className="sm:flex hidden">
            <NavItems/>
          </nav>
        </div>
      </div>
      {/* Smaller device navbar collapsing items */}
      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems/>
        </nav>
      </div>
    </header>
  ) : (
  <header className='fixed top-0 left-0 right-0 z-50 bg-black/90' id='header'>
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-5 mx-auto c-space">
        <p className="text-neutral-400 font-semibold text-xl">{props.title}</p>
        <button onClick={() => setExperience('')} className="text-neutral-400 hover:text-white focus:outline-none flex" aria-label="Exit">
          <img src="/assets/close.svg" alt="Close" className="w-7 h-7"/>
        </button>
      </div>
    </div>
  </header>)
};

export default Navbar;