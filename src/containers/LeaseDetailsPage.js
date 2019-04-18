import React, {PureComponent} from 'react';
import {BackButton} from "../components/back-button/BackButton";
import {connect} from "react-redux";
import {fetchLeaseDetailsAsync, initLeaseDetailsStore} from "../actions/leaseDetails";
import PropTypes from "prop-types";
import {getLeaseDetails, getLeasePaymentHistory} from "../selectors/leaseDetailSelector";
import {fetchLeaseAsync} from "../actions/lease";
import LeaseHeaderDetail from "../components/LeaseHeaderDetail";
import PaymentRecordRow from "../components/PaymentRecordRow";

class LeaseDetailsPage extends PureComponent {

    static propTypes = {
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
        isLoading: PropTypes.bool,
        fetchLeaseDetailsAsync: PropTypes.func,
        initLeaseDetailsStore: PropTypes.func,
    };

    componentWillMount() {
        if (this.props.leases.length === 0 ) {
            this.props.fetchLeaseAsync()
        }
        this.props.fetchLeaseDetailsAsync(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.initLeaseDetailsStore()
    }

    render () {
        const { lease, isLoading, payments } = this.props;
        return (
            <div className="card mt-4">
                <div className="card-body">
                    <div className="card-header">
                        <BackButton {...this.props}/>
                        <LeaseHeaderDetail lease={lease} isLoading={isLoading}/>
                    </div>

                    <div className="table-responsive mt-4">
                        <h6>Payment history</h6>

                        {
                            this.renderPaymentHistory()
                        }
                    </div>

                </div>
            </div>
        );
    }

    renderPaymentHistory = () => {
        const {payments} = this.props;

        if (!payments) {
            return <h3>Loading..</h3>
        }

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                <PaymentRecordRow payments={payments}/>
                </tbody>


            </table>
        );
    }
}

const mapStateToProps = function (state, props) {
    const { id } = props.match.params;
    return {
        lease: getLeaseDetails(state, id),
        leases: state.leases.list,
        isLoading: state.leaseDetail.isLoading,
        payments: getLeasePaymentHistory(state, id)
    };
};

const actions = {
    fetchLeaseDetailsAsync,
    initLeaseDetailsStore,
    fetchLeaseAsync
};


export default connect(mapStateToProps, actions)(LeaseDetailsPage);
