import * as React from 'react'; 
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown} from 'react-bootstrap';
import menus from './menus';

import StoreLogo from '../StoreLogo';

export default function TopBar() {
    let auth = useSelector(state => state.auth);

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#"><StoreLogo /></Navbar.Brand>
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
                     <div className="mr-5 text-right">

                    <Link to={auth.user ? '/account' : '/login'}>
                    <div className="mr-2 inline-block text-red-600 font-bold">
                        {auth?.user?.full_name}
                    </div>
                    </Link>

                    </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    
    )
}