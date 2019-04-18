import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import PageLoader from "./loader/PageLoader";

const LeaseList = ({leases, isLoading}) => {
    if (isLoading) {
        return (
            <PageLoader/>
        );
    }

    return (
        <ul className="list-group bmd-list-group-sm">
            {
                leases.map((lease) => {
                   return (
                     <Link key={lease.id}  className="list-group-item" to={'/leases/' + lease.id}>

                         <div className="bmd-list-group-col">
                             <h5 className="list-group-item-heading">{lease.tenant}</h5>
                             <p className="list-group-item-text">{lease.id}</p>
                         </div>
                     </Link>
                   )
                })
            }
        </ul>
    );
};

LeaseList.propTypes = {
    leases: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string,
                tenant: PropTypes.string,
            }
        )
    ),
};

export default LeaseList;
