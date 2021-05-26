import React from 'react';
import Chart from 'chart.js/auto';
import currencies from './utils/listCurrencies';
import {checkStatus, json} from './utils/fetchExchange';
import './CurrencyConverter.css';

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);


        const params = new URLSearchParams(props.location.search);
        // console.log(params.get('base'), params.get('quote'));

        this.state = {
            rate: 0,
            baseAcronym: params.get('base') || 'GBP',
            baseValue: 0,
            quoteAcronym: params.get('quote') || 'EUR',
            quoteValue: 0,
            loading: false,
        };

        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const {baseAcronym, quoteAcronym} = this.state;
        this.getRate(baseAcronym, quoteAcronym);
        this.getHistoricalRates(baseAcronym, quoteAcronym);
    }

    getRate = (base, quote) => {
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

    getHistoricalRates = (base,quote) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${quote}`)
        .then(checkStatus)
        .then(json)
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
                const chartLabels = Object.keys(data.rates);
                const chartData = Object.values(data.rates).map(rate => rate[quote]);
                const chartLabel = `${base}/${quote}`;
                this.buildChart(chartLabels, chartData, chartLabel);
        })
                .catch(error => console.log(error.message));
        
    }

        buildChart = (labels, data, label) => {
            const chartRef = this.chartRef.current.getContext("2d");

            if(typeof this.chart !== "undefined") {
                this.chart.destroy();
            }

            this.chart = new Chart(this.chartRef.current.getContext("2d"), {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: label,
                            data,
                            fill: false,
                            tension: 0,
                        }
                    ]
                },
                options: {
                    responsive: true,
                }
            })
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
        if(baseAcronym !== this.state.quoteAcronym) {
            this.setState({baseAcronym});
            this.getRate(baseAcronym, this.state.quoteAcronym);
            this.getHistoricalRates(baseAcronym, this.state.quoteAcronym);
        } 
        return;
        
        
    }

    changeBaseValue = (e) => {
        const quoteValue = this.convert(e.target.value, this.state.rate, this.toQuote);
        this.setState({
            baseValue: e.target.value,
            quoteValue,
        });
    }

    changeQuoteAcronym = (e) => {
        const quoteAcronym = e.target.value;
        if(quoteAcronym !== this.state.baseAcronym) {
            this.setState({quoteAcronym});
            this.getRate(this.state.baseAcronym, quoteAcronym);
            this.getHistoricalRates(this.state.baseAcronym, this.state.quoteAcronym);
        }
       return;
    }

    changeQuoteValue = (e) => {
        const baseValue = this.convert(e.target.value, this.state.rate, this.toBase);
        this.setState({
            quoteValue: e.target.value,
            baseValue,
        });
    }

    render() {
        const {rate, baseAcronym, baseValue, quoteAcronym, quoteValue, loading} = this.state;

        const currencyOptions = Object.keys(currencies).map(currencyAcronym =><option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>);
        return(
            <div className="container form-component text-center pt-2">
                <h1 className="h3"><span className="logo">$</span>Currency</h1>
                <h3>1 {baseAcronym} to 1 {quoteAcronym} = {rate.toFixed(4)} {currencies[quoteAcronym].name} </h3>
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
                <canvas ref={this.chartRef} />
            </div>
        )
    }
} 

export default CurrencyConverter;