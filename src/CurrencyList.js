import React from 'react';

const CurrencyList = (props) => {
    const{fixed, rates} = props;
    if(! rates) {
        return null;
    }

    return(
        <table className="table table-sm bg-light">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"className="text-right">1.00 {fixed}</th>
                </tr>
            </thead>
            <tbody>
                {rates.map(currency => 
                    <tr key={currency.acronym}>
                        <td className="">{currency.name}<small>({currency.acronym})</small></td>
                        <td className="">{currency.rate.toFixed(6)}</td>
                    </tr>)}
            </tbody>
        </table>
    )
}

export default CurrencyList;