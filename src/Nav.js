import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Home, About, Contact} from './Templates';
import './Nav.css';

const Header = () => {
    return (
        <Router>
            <div className="header">
                <nav className="navbar navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"><span className="logo">$</span>Currency</Link>
                <ul className="navbar-nav header-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/about/">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/contact/">Contact</Link>
                    </li>
                </ul>
                </nav>
                <Switch>
                    <Route path= '/' exact component={Home} />
                    <Route path='/about/' component={About} />
                    <Route path='/contact' component={Contact} />
                </Switch>
            </div>
            
        </Router>
        
    )
}

export default Header;