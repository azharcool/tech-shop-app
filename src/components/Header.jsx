import React from "react";

function Header(props) {
  console.log(props.title);
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

Header.defaultProps = {
    title: "Default"
}

export default Header;
