import { navLinks } from '../common/constants';

interface NavItemsProps {
  toggleExperience: (exp: boolean) => void;
  isJourneying: boolean;
}

const NavItems = (props: NavItemsProps) => {
  const handleClick = (doesToggleExp: boolean) => {
    props.toggleExperience(doesToggleExp || props.isJourneying);
  };
  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, href, name, altName, exp, altHref }) => (
        <li key={id} className="nav-li">
          {props.isJourneying ? (
            <a
              href={href}
              className="nav-li_a"
              onClick={() => handleClick(exp)}
            >
              {altName}
            </a>
          ) : (
            <a
              href={altHref}
              className="nav-li_a"
              onClick={() => handleClick(exp)}
            >
              {name}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
