import React from 'react';
import currencies from './utils/listCurrencies';
import './Currency.css';
import {checkStatus, json} from './utils/fetchExchange';
import CurrencyList from './CurrencyList';

class CurrencyTool extends React.Component {
    constructor() {
        super();
        this.state = {
            fixed: 'GBP',
            rates: null,
            loading: true
        }
    }

    componentDidMount() {
        this.getRates(this.state.fixed);
    }

    changeFixed = (e) => {
        this.setState({fixed: e.target.value});
        this.getRates(e.target.value);
    }

    getRates = (fixed) => {
        this.setState({loading: true});
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${fixed}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
            if(data.error) {
                throw new Error(data.error)
            }

            const rates = Object.keys(data.rates)
            .filter(acronym => acronym !== fixed)
            .map(acronym => ({
                acronym,
                rate: data.rates[acronym],
                name: currencies[acronym].name,
                symbol: currencies[acronym].symbol,
            }))

            
            this.setState({rates, loading: false});
        })
        .catch(error => console.error(error.message));
    }

    render() {
        const {fixed, rates, loading} = this.state;

        return(
            <div className="form-component container">
                <form className="p-3 bg-light form-inline justify-content-center">
                    <h3 className="mb-2 form-header">Your chosen currency: 1</h3>
                    <select value={fixed} onChange={this.changeFixed} disabled={loading} className="form-content form-control form-control-lg mb-2">
                        {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                    </select>
                </form>
                <CurrencyList base={fixed} rates={rates} />
            </div>
        )
        
    }
} 

export default CurrencyTool ;