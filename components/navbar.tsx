
import React from 'react';
import Link from 'next/link';

const Navbar = (props) => {
  return <nav className="navbar navbar-dark bg-dark navbar-expand-sm ">
    <a href="#" className="navbar-brand form-inline">
      <img src="../static/img/logo.png" width="50px" alt="" />
    </a>
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link f-27" href="#">smart4life</a>
      </li>
      </ul>
      <ul className="navbar-nav ml-auto nav-auth">
      <li className="nav-item m-auto">
        <Link href="/login">Login </Link>
      </li>
      <li className="nav-item m-auto">
        <Link href="/register">Register </Link>
      </li>
    </ul>
  </nav>
};

export default Navbar;
