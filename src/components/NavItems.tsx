import { MouseEvent } from 'react';
import { navLinks } from '../common/constants';

interface NavItemsProps {
  toggleExperience: (exp: boolean) => void;
  isJourneying: boolean;
}

const NavItems = (props: NavItemsProps) => {
  // Drive navigation from the target captured at click time.
  // This avoids React rewriting the same <a>'s href before the browser navigates.
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    doesToggleExp: boolean,
    target: string
  ): void => {
    event.preventDefault();
    props.toggleExperience(doesToggleExp || props.isJourneying);
    window.location.assign(target);
  };
  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, href, name, altName, exp, altHref }) => {
        const target = props.isJourneying ? altHref : href;
        const label = props.isJourneying ? altName : name;
        return (
          <li key={id} className="nav-li">
            <a
              href={target}
              className="nav-li_a"
              onClick={(event) => handleClick(event, exp, target)}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
