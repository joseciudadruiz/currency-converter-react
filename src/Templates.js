import React from 'react';
import CurrencyTool from './Currency';

    const Home = () => {
        return (
            <div className="Container">
                <h1 className="h3"><span className="logo">$</span>Currency</h1>
                <CurrencyTool />
            </div>
            
        )
    }
    const About = () => {
        return (
            <div className="container">
                <h2>About</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit tellus, rutrum nec tincidunt in, rutrum ac magna. Duis sed vestibulum ex, at dictum eros. Integer a nulla odio. Nunc mattis, erat nec faucibus feugiat, lacus urna rutrum augue, eget vehicula urna sem in ex. Phasellus at purus lorem.
                </p>
            </div>
            
            
        )
    }
    
    const Contact = () => {
        return(
            <div className="container">
                <h2>Contact</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit tellus, rutrum nec tincidunt in, rutrum ac magna. Duis sed vestibulum ex, at dictum eros. Integer a nulla odio. Nunc mattis, erat nec faucibus feugiat, lacus urna rutrum augue, eget vehicula urna sem in ex. Phasellus at purus lorem.
                </p>
            </div>
        )
    }


export {Home, About, Contact}; 