import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {Home, Currencies, Contact} from './Templates';
import './Nav.css';
import CurrencyConverter from './CurrencyConverter';

const Header = () => {
    return (
        <Router>
            <div className="header">
                <nav className="navbar navbar-dark bg-dark">
                <Link className="navbar-brand" to="/CurrencyConverter/"><span className="logo">$</span>Currency</Link>
                <ul className="navbar-nav header-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/currencies/">Currencies</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/contact/">Contact</Link>
                    </li>
                </ul>
                </nav>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path= '/CurrencyConverter' component={CurrencyConverter} />
                    <Route path='/currencies' component={Currencies} />
                    <Route path='/contact' component={Contact} />
                </Switch>
            </div>
            
        </Router>
        
    )
}

export default Header;