import React from 'react';
import CurrencyTool from './Currency';
import {Link} from 'react-router-dom';

    const Logo = () => {
        return (
            <h1 className="h3"><span className="logo">$</span>Currency</h1>
        )
    }

    const ContactInfo = () => {
        return (
            <React.Fragment>
                <div className="container text-center contact-info">
                    <p>Thank you for visiting this currency converter tool.</p>
                    <p>This tool has been created using React, Chart.js, npm, node.js, among others</p>
                    <p>Git has been used as controller and Heroku for deployment.</p>
                    <p>For more visit the git repo or the live page hosted in Heroku</p>
                    <div className="contact-btn">
                        <a role="button" className="btn btn-dark btn-lg" href="https://github.com/joseciudadruiz/currency-converter-react/tree/heroku">GitHub</a>
                        <a role="button" className="btn btn-dark btn-lg" href="https://sleepy-mountain-58055.herokuapp.com">Heroku</a>
                    </div>

                </div>
            </React.Fragment>
        )
    }

    const Home = () => {
        return(
            <React.Fragment>
                <Logo />
                <div className="home-intro">
                    <h3 className="text-center">Welcome to the $Currency, <Link className="no-style" to='./CurrencyConverter'>click here to start</Link></h3>
                </div>
            </React.Fragment>
        )
    }
    const Currencies = () => {
        return (
            <div className="container">
                <Logo />
                <CurrencyTool />
            </div>
            
            
        )
    }
    
    const Contact = () => {
        return(
            <div className="container">
                <Logo />
                <ContactInfo />
            </div>
        )
    }


export {Home, Currencies, Contact}; 