import React from 'react';
import { Link } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';

function Header(props) {
  return (
    <header className='navbar-dark'>
      <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
        <div className='container'>
          <Link className='navbar-brand fw-bold fs-3' to='/'>
            Contact App
          </Link>
          <div>
            <button
              className='btn border border-secondary navbar-toggler '
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link className='nav-link active' aria-current='page' to='/'>
                    <BiUserCircle className='admin mx-2 fs-5' />
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
