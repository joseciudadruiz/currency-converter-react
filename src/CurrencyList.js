import React from 'react';
import {Link} from 'react-router-dom';

const CurrencyList = (props) => {
    const{base, rates} = props;
    if(!rates) {
        return null;
    }

    return(
        <table className="table table-sm bg-light">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"className="text-right">1.00 {base}</th>
                </tr>
            </thead>
            <tbody>
                {rates.map(currency => 
                    <tr key={currency.acronym}>
                        <td className="text-right">{currency.name}<small>({currency.acronym})</small></td>
                        <td className="text-right"><Link to={`/CurrencyConverter?base=${base}&quote=${currency.acronym}`}>{currency.rate.toFixed(6)}</Link></td>
                    </tr>)}
            </tbody>
        </table>
    )
}

export default CurrencyList;