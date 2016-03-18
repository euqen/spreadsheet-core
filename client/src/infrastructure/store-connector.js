import React from 'react';

export default function bind(store, getState) {
    return function (DecoratedComponent) {
        return class StoreConnector extends React.Component {
            constructor(props) {
                super(props);

                this.handleStoreChanged = this.handleStoreChanged.bind(this);
                this.state = getState(props);
            }

            componentWillMount() {
                store.subscribe(this.handleStoreChanged)
            }

            componentWillReceiveProps(nextProps) {
                this.setState(getState(nextProps));
            }

            componentWillUnmount() {
                store.unsubscribe(this.handleStoreChanged)
            }

            handleStoreChanged() {
                this.setState(getState(this.props));
            }

            render() {
                return <DecoratedComponent {...this.props} {...this.state} />;
            }
        };
    };
}