import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import menus from './menus';

export default function Home() {
        return (
            <div>
            <Navbar className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark opacity-75" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">POS</Navbar.Brand>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <Nav className="me-auto">
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                    {menus.map(menu => {
                        return(
                            <NavDropdown.Item key={`${menu.id}`} href={`/${menu.id}`}>{menu.label}</NavDropdown.Item>
                        )
                    })}
                </NavDropdown>
            </Nav>
            </div>
            </Container>
          </Navbar>
          </div>
        )
    }