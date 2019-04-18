import React from 'react';

const AppLayout = (props) => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <h4 className="badge badge-pill badge-dark">Lease </h4>
                </div>
            </nav>

            <div className="container">
                { props.children }
            </div>
        </React.Fragment>
    );
};

export default AppLayout;
