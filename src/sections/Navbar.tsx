import { Suspense, useContext, useState, lazy } from 'react';
import { experiences } from '../common/constants.ts';
import { JourneyContext } from '../components/context/JourneyContext.tsx';
import { isEmpty, isNotEmpty } from '../common/utils.ts';

const NavItems = lazy(() => import('../components/NavItems.tsx'));

interface NavProps {
  title: string;
}

const Navbar = (props: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { experience, setExperience } = useContext(JourneyContext);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const toggleExp = () => {
    setExperience((prev) => (isEmpty(prev) ? experiences[0] : ''));
    toggleMenu();
  };

  const suspenseNavItems = () => (
    <Suspense>
      <NavItems
        isJourneying={isNotEmpty(experience)}
        startExperience={toggleExp}
      />
    </Suspense>
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black/90" id="header">
      <div className="mx-auto max-w-7xl">
        <div className="c-space mx-auto flex items-center justify-between py-5">
          {isEmpty(props.title) ? (
            <a href="/" className="group grid-cols-1">
              <p className="col-span-1 row-span-1 text-xl font-semibold text-neutral-400 transition-colors group-hover:text-white">
                Samuele Battaglino
              </p>
              <p className="col-span-1 row-span-1 text-base font-light text-neutral-600 transition-colors group-hover:text-neutral-400">
                Computer Engineer
              </p>
            </a>
          ) : (
            <p className="text-xl font-semibold text-white">{props.title}</p>
          )}
          {/* Smaller device navbar collapsing button */}
          <button
            onClick={toggleMenu}
            className="flex text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-label="Toggle Menu"
          >
            <img
              src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'}
              alt="toggle"
              className="h-6 w-6"
            />
          </button>
          {/* Larger device navbar on top*/}
          <nav className="hidden sm:flex">{suspenseNavItems()}</nav>
        </div>
      </div>
      {/* Smaller device navbar collapsing items */}
      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">{suspenseNavItems()}</nav>
      </div>
    </header>
  );
};

export default Navbar;
