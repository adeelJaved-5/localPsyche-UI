import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
            <Link className="navbar-brand" to="/">
              <ThemeConsumer>
                {({ data }) => {
                  return data.theme === 'light' ? (
                    <img src={'img/psyche-logo.svg'} alt="logo" />
                  ) : (
                    <img src={'img/psyche-logo-dark.svg'} alt="logo" />
                  );
                }}
              </ThemeConsumer>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
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
