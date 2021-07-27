import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../context/ThemeContext';
export default class Header extends Component {
  componentDidMount() {
    let el = document.querySelector('#darkTheme');
    if (el) {
      el.addEventListener('click', function () {
        document.body.classList.toggle('dark');
      });
    }
  }
  render() {
    return (
      <>
        <header className="light-bb">
          <Navbar expand="lg">
            <Link className="navbar-brand" to="/exchange">
              <ThemeConsumer>
                {({ data }) => {
                  return data.theme === 'light' ? (
                    <img src={'images/Local Psyche-blue-01.png'} alt="logo" />
                  ) : (
                    <img src={'images/Local Psyche-blue-01.png'} alt="logo" />
                  );
                }}
              </ThemeConsumer>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav mr-auto">
                <Link to="/exchange" className="nav-link">
                  Exchange
                </Link>
                <Link to="/wallet" className="nav-link">
                  Wallet
                </Link>
                <Link to="/" className="nav-link">
                  P2P
                </Link>
                
              </Nav>
              <Nav className="navbar-nav ml-auto">
                <Dropdown className="header-custom-icon">
                  <ThemeConsumer>
                    {({ data, update }) => (
                      <Button variant="default" onClick={update} id="darkTheme">
                        {data.theme === 'light' ? (
                          <i className="icon ion-md-moon"></i>
                        ) : (
                          <i className="icon ion-md-sunny"></i>
                        )}
                      </Button>
                    )}
                  </ThemeConsumer>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </>
    );
  }
}
