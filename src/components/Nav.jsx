import { Link, useLocation } from "react-router-dom";

import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import styled from "styled-components";

const StyledNav = styled.ul`
  position: absolute;
  top: 0%;
  left: 50%;
  margin: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;

  & li {
    list-style: none;
  }
`;

const Nav = () => {
  const location = useLocation();

  return (
    <StyledNav>
      <li>
        <Link to="/">
          <ListAltIcon
            sx={{
              color: location.pathname === "/" ? "white" : "darkgray",
            }}
          />
        </Link>
      </li>
      <li>
        <Link to="/calendar">
          <CalendarMonthIcon
            sx={{
              color: location.pathname === "/calendar" ? "white" : "darkgray",
            }}
          />
        </Link>
      </li>
    </StyledNav>
  );
};

export default Nav;
