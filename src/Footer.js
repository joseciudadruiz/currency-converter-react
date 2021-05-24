import React from 'react';
import './Footer.css';
import github from './github.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <p className="footer-content-p">
                    Jose Ciudad Ruiz, 2021.
                </p>
            </div>
            <div className="footer-social">
                <button className="open-github">
                    <a href="https://github.com/joseciudadruiz?tab=repositories">
                        <img src={github}/>
                    </a>
                </button> 
            </div>
        </div>
        
    )
}

export default Footer; 