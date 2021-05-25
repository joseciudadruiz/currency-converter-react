import React from 'react';
import currencies from './utils/listCurrencies';
import {checkStatus, json} from './utils/fetchExchange';
import './CurrencyConverter.css';

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 1.1706,
            baseAcronym: 'GBP',
            baseValue: 1,
            quoteAcronym: 'EUR',
            quoteValue: 1 * 1.1706,
            loading: false,
        };
    }

    componentDidMount() {
        const {baseAcronym, quoteAcronym} = this.state;
        this.getRate(baseAcronym, quoteAcronym);
    }

    getRate = (base,quote) => {
        this.setState({loading: true});
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}&to=${quote}`)
        .then(checkStatus)
        .then(json)
        .then(data => {
            if(data.error) {
                throw new Error(data.error);
            }

            const rate = data.rates[quote];

            this.setState({
                rate,
                baseValue: 1,
                quoteValue: Number((1 * rate).toFixed(3)),
                loading: false,
            });
        })
        .catch(error => console.log(error.message));
    }

    toBase(amount, rate) {
        return amount * (1 / rate);
    }

    toQuote(amount, rate) {
        return amount * rate;
    }

    convert(amount, rate, equation) {
        const input = parseFloat(amount);
        if(Number.isNaN(input)) {
            return '';
        }
        return equation(input, rate).toFixed(3);
    }

    changeBaseAcronym = (e) => {
        const baseAcronym = e.target.value;
        this.setState({baseAcronym});
        this.getRate(baseAcronym, this.state.quoteAcronym);
    }

    changeBaseValue = (e) => {
        const quoteValue =this.convert(e.target.value, this.state.rate, this.toQuote);
        this.setState({
            baseValue: e.target.value,
            quoteValue
        });
    }

    changeQuoteAcronym = (e) => {
        const quoteAcronym = e.target.value;
        this.setState({quoteAcronym});
        this.getRate(this.state.baseAcronym, quoteAcronym);
    }

    changeQuoteValue = (e) => {
        const baseValue = this.convert(e.target.value, this.state.rate, this.toBase);
        this.setState({
            quoteValue: e.target.value,
            baseValue
        });
    }

    render() {
        const {rate, baseAcronym, baseValue, quoteAcronym, quoteValue, loading} = this.state;

        const currencyOptions = Object.keys(currencies).map(currencyAcronym =><option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>);
        return(
            <div className="container form-component text-center pt-2">
                <h3>1 {baseAcronym} to {quoteAcronym} = {rate} {currencies[quoteAcronym].name}</h3>
                <form className="form-row p-3 bg-light form-currency">
                    <div className="form-group">
                        <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control form-control-lg mb-2" disabled={loading}>
                            {currencyOptions}
                        </select>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    {currencies[baseAcronym].symbol}
                                </div>
                            </div>
                            <input id="base" className="form-control" value={baseValue} onChange={this.changeBaseValue} type="number" />
                        </div>
                        <small className="text-secondary">
                            {currencies[baseAcronym].name}
                        </small>
                    </div>
                    <div className="py-3 px-3 d-flex justify-content-center align-items-center">
                        <h3>=</h3>

                    </div>
                    <div className="form-group">
                        <select value={quoteAcronym} onChange={this.changeQuoteAcronym} className="form-control form-control-lg mb-2" disabled={loading}>
                            {currencyOptions}
                        </select>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">{currencies[quoteAcronym].symbol}</div>
                            </div>
                            <input id="quote" className="form-control" value={quoteValue} onChange={this.changeQuoteValue} type="number" />
                        </div>
                        <small className="text-secondary">{currencies[quoteAcronym].name}</small>
                    </div>
                    
                </form>
            </div>
        )
    }
} 

export default CurrencyConverter;