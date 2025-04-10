import { navLinks } from "../common/constants";

interface NavItemsProps {
  startExperience: () => void;
}

const NavItems = (props: NavItemsProps) => {
  return (
    <ul className="nav-ul">
      {navLinks.map(({id, href, name, exp}) => (
        <li key={id} className="nav-li">
          <a href={href} className="nav-li_a" onClick={() => exp ? props.startExperience() : true}>{name}</a>
        </li>
      ))}
    </ul>
  )
};

export default NavItems;
