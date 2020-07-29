import React, { useEffect, useState } from "react";
import logo from "../logo.png";

const Nav = () => {
  const [handleShow, setHandleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHandleShow(true);
      } else setHandleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${handleShow && "nav_black"}`}>
      <img className="nav_logo" src={logo} alt="netflix logo" />
      <img
        className="nav_avatar"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
        alt="avatar"
      />
    </div>
  );
};

export default Nav;
