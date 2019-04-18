import React, { Component } from "react";
import PageLoader from "./loader/PageLoader";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
        }

        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const Component = this.state.component;

            return Component ? <Component {...this.props} /> : <PageLoader/>;
        }
    }

    return AsyncComponent;
}
