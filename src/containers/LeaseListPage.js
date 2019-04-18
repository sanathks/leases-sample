import React, {PureComponent} from 'react';
import LeaseList from "../components/LeaseList";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchLeaseAsync, initLeaseStore} from "../actions/lease";

class LeaseListPage extends PureComponent {

    static propTypes = {
        leases: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    id: PropTypes.string,
                    tenant: PropTypes.string,
                }
            )
        ),
        isLoading: PropTypes.bool,
        fetchLeaseAsync: PropTypes.func,
        initLeaseStore: PropTypes.func,
    };

    componentWillMount() {
        this.props.fetchLeaseAsync()
    }

    componentWillUnmount() {
        //this.props.initLeaseStore()
    }

    render () {
        const {isLoading, leases} = this.props;

        return (
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title">Current Leases</h5>
                    <div className="card-text">
                        <LeaseList leases={leases} isLoading={isLoading}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        leases: state.leases.list,
        isLoading: state.leases.meta.isLoading,
    };
};

const actions = {
    fetchLeaseAsync,
    initLeaseStore
};

export default connect(mapStateToProps, actions)(LeaseListPage);
