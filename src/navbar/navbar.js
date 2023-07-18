import React from 'react'
import {Container,Nav,Navbar} from "react-bootstrap"
import logo from "./logo.svg"

function NavbarComponent() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">
      <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        BingeTime</Navbar.Brand>
      <Nav className="me-auto" >
        <Nav.Link href="/" eventKey="home">Home</Nav.Link>
        <Nav.Link href="/movies"eventKey="movies">Movies</Nav.Link>
        <Nav.Link href="/tv"eventKey="tv">TV shows</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default NavbarComponent
