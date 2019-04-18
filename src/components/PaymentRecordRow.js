import React from 'react';

const PaymentRecordRow = ({payments}) => {
    return (
        <React.Fragment>
            {
                payments.map((payment, key) => {
                   return (
                       <tr key={key}>
                           <td>{payment.from}</td>
                           <td>{payment.to}</td>
                           <td>{payment.days}</td>
                           <td>{payment.amount}</td>
                       </tr>
                   );
                })
            }
        </React.Fragment>
    );
};

export default PaymentRecordRow;
