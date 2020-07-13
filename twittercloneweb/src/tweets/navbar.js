import React, { useState, useEffect, useRef } from "react";

export function NavbarComponent(props) {
  const { username } = props;
  return (
    <Navbar>
      <NavItem
        href="/trending"
        icon={<i className="fas fa-fire"></i>}
      ></NavItem>
      <NavItem
        href="/global"
        icon={<i className="fas fa-globe-americas"></i>}
      ></NavItem>
      <NavItem icon={<i className="fa fa-user-cog"></i>}>
        <DropdownMenu username={username} />
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) {
      if (
        e.clientX < 0.8 * window.innerWidth ||
        e.clientY > 0.3 * window.innerHeight
      ) {
        setOpen(false);
      }
    }
  };

  return (
    <li className="nav-item">
      <a
        href={props.href}
        className="icon-button"
        ref={ref}
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  const { username } = props;
  console.log(username);
  function DropdownItem(props) {
    return (
      <a href={props.href} className="menu-item">
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem href={`/profile/${username}`}>Profile</DropdownItem>
      <DropdownItem href="/update-profile">Settings</DropdownItem>
    </div>
  );
}
