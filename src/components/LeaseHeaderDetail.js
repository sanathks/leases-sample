import React from 'react';
import PropTypes from 'prop-types';
import PageLoader from "./loader/PageLoader";

const LeaseHeaderDetail = ({lease, isLoading}) => {
    if (isLoading) {
        return (
            <PageLoader/>
        );
    }

    return (
        <div className="row mt-4">
            <div className="col-md-2">
                <p>
                    <small className="badge badge-pill badge-primary">
                        Tenant Name
                    </small>
                </p>
                { lease.tenant }

            </div>

            <div className="col-md-2">
                <p>
                    <small className="badge badge-pill badge-primary">
                        Start Date
                    </small>
                </p>
                { lease.start_date }

            </div>

            <div className="col-md-2">
                <p>
                    <small className="badge badge-pill badge-primary">
                        End date
                    </small>
                </p>
                { lease.end_date }

            </div>

            <div className="col-md-2">
                <p>
                    <small className="badge badge-pill badge-primary">
                        Rent
                    </small>
                </p>
                ${ lease.rent }
            </div>

            <div className="col-md-2">
                <p>
                    <small className="badge badge-pill badge-primary">
                        Frequency
                    </small>
                </p>
                { lease.frequency }

            </div>

            <div className="col-md-2">
                <p>
                    <small className="badge badge-pill badge-primary">
                        Payment Day
                    </small>
                </p>
                { lease.payment_day }

            </div>
        </div>
    );
};

LeaseHeaderDetail.propTypes = {
    lease: PropTypes.shape(
            {
                id: PropTypes.string,
                start_date: PropTypes.string,
                end_date: PropTypes.string,
                rent: PropTypes.number,
                frequency: PropTypes.string,
                payment_day: PropTypes.string,
            }
    ),
    isLoading: PropTypes.bool
};

export default LeaseHeaderDetail;
