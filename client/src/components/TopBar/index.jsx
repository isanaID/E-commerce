import * as React from 'react'; 
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import menus from './menus';

import StoreLogo from '../StoreLogo';

export default function TopBar() {
    let auth = useSelector(state => state.auth);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="/"><StoreLogo /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Menu" id="basic-nav-dropdown">
                    {menus.map(menu => {
                        return(
                            <NavDropdown.Item key={`${menu.id}`} href={`/${menu.id}`}>{menu.label}</NavDropdown.Item>
                        )
                    })}
                </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Link</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                     <div className="mr-5 text-right">

                    <Nav.Link href={auth.user ? '/account' : '/login'}>
                    <div className="mr-2 inline-block text-red-600 font-bold">
                        {auth?.user?.full_name}
                    </div>
                    </Nav.Link>
                    </div>
                </Container>
            </Navbar>
        </div>
    
    )
}